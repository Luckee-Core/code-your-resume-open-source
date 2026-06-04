import { escapeForInlineScript } from "./escape-for-inline-script";
import { STUDIO_PREVIEW_CONTENT_HEIGHT_BOOT_FN } from "./compute-studio-preview-content-height";

/** Matches the preview mount node in {@link buildTsxReactPreviewSrcDoc} HTML (`#root`). */
export const IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID = "root";

/** `postMessage` `data.type` from preview iframe → parent (iframe pixel height sync). */
export const IMAGE_STUDIO_PREVIEW_HEIGHT_POST_MESSAGE_TYPE = "image-studio-preview-content-height";

const PREVIEW_REACT_UMD_VERSION = "18.3.1";

export type ImageStudioPreviewDimensions = {
  widthPx: number;
  heightPx: number;
};

const DEFAULT_PREVIEW_DIM: ImageStudioPreviewDimensions = { widthPx: 960, heightPx: 540 };

const clampDim = (n: number, fallback: number): number => {
  if (!Number.isFinite(n)) return fallback;
  const r = Math.round(n);
  if (r < 64) return 64;
  if (r > 8192) return 8192;
  return r;
};

const previewRequireShim = `
function __imageStudioPreviewRequire(specifier) {
  var React = window.React;
  if (!React) throw new Error('React failed to load in preview');
  if (specifier === 'react') {
    var m = { __esModule: true, default: React };
    for (var key in React) {
      if (Object.prototype.hasOwnProperty.call(React, key)) m[key] = React[key];
    }
    return m;
  }
  if (specifier === 'react/jsx-runtime' || specifier === 'react/jsx-dev-runtime') {
    return {
      __esModule: true,
      jsx: function (type, props, key) {
        return React.createElement.apply(React, arguments);
      },
      jsxs: function (type, props, key) {
        return React.createElement.apply(React, arguments);
      },
      Fragment: React.Fragment,
    };
  }
  // Next.js App Router modules (studio preview has no Next runtime — stubs only).
  if (specifier === 'next/navigation') {
    return {
      __esModule: true,
      useRouter: function useRouter() {
        return {
          push: function () {},
          replace: function () {},
          prefetch: function () {},
          refresh: function () {},
          back: function () {},
          forward: function () {},
        };
      },
      usePathname: function usePathname() {
        return '/';
      },
      useSearchParams: function useSearchParams() {
        return new URLSearchParams();
      },
      useParams: function useParams() {
        return {};
      },
      useSelectedLayoutSegment: function useSelectedLayoutSegment() {
        return null;
      },
      useSelectedLayoutSegments: function useSelectedLayoutSegments() {
        return [];
      },
      redirect: function redirect() {},
      permanentRedirect: function permanentRedirect() {},
      notFound: function notFound() {},
    };
  }
  if (specifier === 'next/link') {
    return {
      __esModule: true,
      default: function Link(props) {
        var href = props && props.href != null ? String(props.href) : '#';
        return React.createElement('a', { href: href }, props && props.children);
      },
    };
  }
  throw new Error('Unsupported import in TSX preview (only react is available): ' + String(specifier));
}
`.trim();

/**
 * Build a full HTML document for the preview iframe: Tailwind Play CDN, React UMD, and boot logic for compiled CJS.
 */
export const buildTsxReactPreviewSrcDoc = (
  compiledJs: string,
  dimensions: ImageStudioPreviewDimensions = DEFAULT_PREVIEW_DIM,
): string => {
  const w = clampDim(dimensions.widthPx, DEFAULT_PREVIEW_DIM.widthPx);
  const h = clampDim(dimensions.heightPx, DEFAULT_PREVIEW_DIM.heightPx);
  const safeCompiled = escapeForInlineScript(compiledJs);
  const reactUrl = `https://unpkg.com/react@${PREVIEW_REACT_UMD_VERSION}/umd/react.production.min.js`;
  const reactDomUrl = `https://unpkg.com/react-dom@${PREVIEW_REACT_UMD_VERSION}/umd/react-dom.production.min.js`;

  const bootScript = `
${previewRequireShim}
${STUDIO_PREVIEW_CONTENT_HEIGHT_BOOT_FN}
(function () {
  var rootEl = document.getElementById('${IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID}');
  function showErr(err) {
    var msg = err && err.stack ? err.stack : String(err && err.message ? err.message : err);
    if (rootEl) {
      rootEl.innerHTML =
        '<pre style="padding:12px;color:#b91c1c;font:12px/1.4 ui-monospace,monospace;white-space:pre-wrap;word-break:break-word">' +
        msg.replace(/</g, '&lt;') +
        '</pre>';
    }
  }
  window.onerror = function (message, source, lineno, colno, err) {
    showErr(err || message);
    return true;
  };
  try {
    var require = __imageStudioPreviewRequire;
    var exports = {};
    var module = { exports: exports };
    ${safeCompiled}
    var Comp =
      module.exports && module.exports.__esModule
        ? module.exports.default
        : module.exports.default || module.exports;
    if (!Comp) {
      showErr('No default export — export default function MyComponent() { ... }');
      return;
    }
    var React = window.React;
    var ReactDOM = window.ReactDOM;
    if (!React || !ReactDOM) {
      showErr('React UMD failed to load (check network or CDN). Preview iframe uses React ${PREVIEW_REACT_UMD_VERSION} UMD because React 19 has no official UMD on unpkg.');
      return;
    }
    function reportContentHeight() {
      if (!rootEl) return;
      var h = __measureStudioPreviewContentHeight(rootEl);
      if (!h || !isFinite(h)) return;
      try {
        window.parent.postMessage(
          { type: '${IMAGE_STUDIO_PREVIEW_HEIGHT_POST_MESSAGE_TYPE}', heightPx: h },
          '*'
        );
      } catch (_) {}
    }
    function mountPreview() {
      if (typeof ReactDOM.createRoot === 'function') {
        ReactDOM.createRoot(rootEl).render(React.createElement(Comp));
      } else if (typeof ReactDOM.render === 'function') {
        ReactDOM.render(React.createElement(Comp), rootEl);
      } else {
        showErr('ReactDOM has neither createRoot nor render');
        return;
      }
      setTimeout(reportContentHeight, 100);
      setTimeout(reportContentHeight, 500);
      setTimeout(reportContentHeight, 1200);
      if (typeof ResizeObserver === 'function' && rootEl) {
        new ResizeObserver(function () {
          reportContentHeight();
        }).observe(rootEl);
      }
    }
    mountPreview();
  } catch (e) {
    showErr(e);
  }
})();
`.trim();

  const safeBoot = escapeForInlineScript(bootScript);
  const rootId = IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=${w}"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="${reactUrl}"></script>
  <script crossorigin src="${reactDomUrl}"></script>
  <style>
    html, body {
      margin: 0;
      min-height: 0;
      height: auto;
      overflow: visible;
    }
    @media print {
      @page {
        margin: 0;
        size: ${w}px ${h}px;
      }
      body {
        margin: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      #${rootId} {
        width: ${w}px !important;
        height: auto !important;
        overflow: visible;
      }
    }
    body {
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
    }
  </style>
</head>
<body class="bg-white text-gray-900 antialiased">
  <div id="${rootId}" style="width:${w}px;height:auto;overflow:visible;box-sizing:border-box"></div>
  <script>${safeBoot}</script>
</body>
</html>`;
};
