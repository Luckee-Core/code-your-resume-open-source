"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateEmployeeThunk } from "@/store/thunks";
import { crmDetailPageTokens as t } from "@/packages/crm-detail-ui";

export const AtAGlanceSection = () => {
  const dispatch = useAppDispatch();
  const employee = useAppSelector((s) => s.currentCompanyEmployee);
  const [role, setRole] = useState(employee.role);
  const [email, setEmail] = useState(employee.email);

  useEffect(() => {
    setRole(employee.role);
    setEmail(employee.email);
  }, [employee.id, employee.role, employee.email]);

  const onSave = async () => {
    if (!employee.id) return;
    const status = await dispatch(updateEmployeeThunk({ id: employee.id, role, email }));
    if (status === 200) {
      toast.success("Saved");
    } else {
      toast.error("Save failed");
    }
  };

  return (
    <section className={styles.card} aria-labelledby="crm-employee-at-a-glance-heading">
      <h2 id="crm-employee-at-a-glance-heading" className={styles.cardTitle}>
        At a glance
      </h2>
      <div className={styles.fields}>
        <label className={styles.label}>
          Role
          <input className={styles.input} value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <label className={styles.label}>
          Email
          <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="button" className={styles.btn} onClick={() => void onSave()}>
          Save role & email
        </button>
      </div>
    </section>
  );
};

const styles = {
  card: t.researchCard,
  cardTitle: t.researchCardTitle,
  fields: `space-y-3`,
  label: t.formLabel,
  input: t.formInput,
  btn: t.btnPrimaryMd,
};
