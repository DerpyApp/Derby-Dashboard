import React from "react";
import { BsCheckLg } from "react-icons/bs";
import styles from "./Stepper.module.css";

/**
 * steps: [{ label: string, status: "done" | "active" | "upcoming" }]
 */
export default function Stepper({ steps }) {
  return (
    <div className={styles.full}>
      {steps.map((step, idx) => (
        <React.Fragment key={step.label}>
          <div className={styles.stepItem}>
            <div
              className={`${styles.circle} ${
                step.status === "upcoming" ? styles.circleUpcoming : styles.circleFilled
              }`}
            >
              {step.status === "done" ? <BsCheckLg /> : <span>{idx + 1}</span>}
            </div>
            <div
              className={`${styles.label} ${
                step.status === "upcoming" ? styles.labelUpcoming : styles.labelActive
              }`}
            >
              {step.label}
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`${styles.connector} ${
                step.status === "done" ? styles.connectorDone : styles.connectorUpcoming
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
