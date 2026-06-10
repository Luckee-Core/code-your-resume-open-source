import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./appSlice";
import studioBuilderReducer from "./builders/studioBuilder";
import crmBuilderReducer from "./builders/crmBuilder";
import companiesListBuilderReducer from "./builders/companiesListBuilder";
import jobsListBuilderReducer from "./builders/jobsListBuilder";
import breadcrumbBuilderReducer from "./builders/breadcrumbBuilder";
import technicalSkillsBuilderReducer from "./builders/technicalSkillsBuilder";
import professionalBackgroundBuilderReducer from "./builders/professionalBackgroundBuilder";
import jobStudioBuilderReducer from "./builders/jobStudioBuilder";
import jobDetailChatFabReducer from "./builders/jobDetailChatFab";
import currentImageGraphicReducer from "./current/currentImageGraphic";
import currentCompanyReducer from "./current/currentCompany";
import currentJobReducer from "./current/currentJob";
import currentTechnicalSkillsReducer from "./current/currentTechnicalSkills";
import currentProfessionalBackgroundReducer from "./current/currentProfessionalBackground";
import currentStudioEditorReducer from "./current/currentStudioEditor";
import currentJobStudioReducer from "./current/currentJobStudio";
import imageGraphicsReducer from "./dumps/imageGraphics";
import companiesReducer from "./dumps/companies";
import jobsReducer from "./dumps/jobs";
import jobResponsibilitiesReducer from "./dumps/jobResponsibilities";
import jobRequirementsReducer from "./dumps/jobRequirements";
import jobNiceToHavesReducer from "./dumps/jobNiceToHaves";
import jobListingSectionCountsReducer from "./dumps/jobListingSectionCounts";
import jobQuestionsReducer from "./dumps/jobQuestions";
import jobNewsletterSourcesReducer from "./dumps/jobNewsletterSources";
import jobNewsletterIngestRunsReducer from "./dumps/jobNewsletterIngestRuns";
import jobNewsletterIngestAiPromptsReducer from "./dumps/jobNewsletterIngestAiPrompts";
import jobNewsletterIngestAiCostsReducer from "./dumps/jobNewsletterIngestAiCosts";
import aiPromptsReducer from "./dumps/aiPrompts";
import aiExchangeCostsReducer from "./dumps/aiExchangeCosts";
import jobQuestionAnswersReducer from "./dumps/jobQuestionAnswers";
import linkedInProfilesReducer from "./dumps/linkedinProfiles";
import linkedInEmploymentsReducer from "./dumps/linkedinEmployments";
import linkedInEducationsReducer from "./dumps/linkedinEducations";
import linkedInCertificationsReducer from "./dumps/linkedinCertifications";
import currentJobNewsletterSourceReducer from "./current/currentJobNewsletterSource";

export const rootReducer = combineReducers({
  app: appReducer,
  currentImageGraphic: currentImageGraphicReducer,
  currentCompany: currentCompanyReducer,
  currentJob: currentJobReducer,
  currentTechnicalSkills: currentTechnicalSkillsReducer,
  currentProfessionalBackground: currentProfessionalBackgroundReducer,
  currentStudioEditor: currentStudioEditorReducer,
  currentJobStudio: currentJobStudioReducer,
  currentJobNewsletterSource: currentJobNewsletterSourceReducer,
  imageGraphics: imageGraphicsReducer,
  companies: companiesReducer,
  jobs: jobsReducer,
  jobResponsibilities: jobResponsibilitiesReducer,
  jobRequirements: jobRequirementsReducer,
  jobNiceToHaves: jobNiceToHavesReducer,
  jobListingSectionCounts: jobListingSectionCountsReducer,
  jobQuestions: jobQuestionsReducer,
  jobNewsletterSources: jobNewsletterSourcesReducer,
  jobNewsletterIngestRuns: jobNewsletterIngestRunsReducer,
  jobNewsletterIngestAiPrompts: jobNewsletterIngestAiPromptsReducer,
  jobNewsletterIngestAiCosts: jobNewsletterIngestAiCostsReducer,
  aiPrompts: aiPromptsReducer,
  aiExchangeCosts: aiExchangeCostsReducer,
  jobQuestionAnswers: jobQuestionAnswersReducer,
  linkedInProfiles: linkedInProfilesReducer,
  linkedInEmployments: linkedInEmploymentsReducer,
  linkedInEducations: linkedInEducationsReducer,
  linkedInCertifications: linkedInCertificationsReducer,
  studioBuilder: studioBuilderReducer,
  crmBuilder: crmBuilderReducer,
  companiesListBuilder: companiesListBuilderReducer,
  jobsListBuilder: jobsListBuilderReducer,
  breadcrumbBuilder: breadcrumbBuilderReducer,
  technicalSkillsBuilder: technicalSkillsBuilderReducer,
  professionalBackgroundBuilder: professionalBackgroundBuilderReducer,
  jobStudioBuilder: jobStudioBuilderReducer,
  jobDetailChatFab: jobDetailChatFabReducer,
});
