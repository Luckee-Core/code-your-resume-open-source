import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./appSlice";
import studioBuilderReducer from "./builders/studioBuilder";
import crmBuilderReducer from "./builders/crmBuilder";
import companiesListBuilderReducer from "./builders/companiesListBuilder";
import breadcrumbBuilderReducer from "./builders/breadcrumbBuilder";
import experienceBuilderReducer from "./builders/experienceBuilder";
import technicalSkillsBuilderReducer from "./builders/technicalSkillsBuilder";
import professionalBackgroundBuilderReducer from "./builders/professionalBackgroundBuilder";
import jobStudioBuilderReducer from "./builders/jobStudioBuilder";
import jobDetailChatFabReducer from "./builders/jobDetailChatFab";
import currentImageGraphicReducer from "./current/currentImageGraphic";
import currentCompanyReducer from "./current/currentCompany";
import currentJobReducer from "./current/currentJob";
import currentCompanyEmployeeReducer from "./current/currentCompanyEmployee";
import currentJobApplicationReducer from "./current/currentJobApplication";
import currentTechnicalSkillsReducer from "./current/currentTechnicalSkills";
import currentProfessionalBackgroundReducer from "./current/currentProfessionalBackground";
import currentJobStudioReducer from "./current/currentJobStudio";
import imageGraphicsReducer from "./dumps/imageGraphics";
import companiesReducer from "./dumps/companies";
import employeesReducer from "./dumps/employees";
import jobsReducer from "./dumps/jobs";
import jobApplicationsReducer from "./dumps/jobApplications";
import jobResponsibilitiesReducer from "./dumps/jobResponsibilities";
import jobRequirementsReducer from "./dumps/jobRequirements";
import jobNiceToHavesReducer from "./dumps/jobNiceToHaves";
import employmentsReducer from "./dumps/employments";

export const rootReducer = combineReducers({
  app: appReducer,
  currentImageGraphic: currentImageGraphicReducer,
  currentCompany: currentCompanyReducer,
  currentJob: currentJobReducer,
  currentCompanyEmployee: currentCompanyEmployeeReducer,
  currentJobApplication: currentJobApplicationReducer,
  currentTechnicalSkills: currentTechnicalSkillsReducer,
  currentProfessionalBackground: currentProfessionalBackgroundReducer,
  currentJobStudio: currentJobStudioReducer,
  imageGraphics: imageGraphicsReducer,
  companies: companiesReducer,
  employees: employeesReducer,
  jobs: jobsReducer,
  jobApplications: jobApplicationsReducer,
  jobResponsibilities: jobResponsibilitiesReducer,
  jobRequirements: jobRequirementsReducer,
  jobNiceToHaves: jobNiceToHavesReducer,
  employments: employmentsReducer,
  studioBuilder: studioBuilderReducer,
  crmBuilder: crmBuilderReducer,
  companiesListBuilder: companiesListBuilderReducer,
  breadcrumbBuilder: breadcrumbBuilderReducer,
  experienceBuilder: experienceBuilderReducer,
  technicalSkillsBuilder: technicalSkillsBuilderReducer,
  professionalBackgroundBuilder: professionalBackgroundBuilderReducer,
  jobStudioBuilder: jobStudioBuilderReducer,
  jobDetailChatFab: jobDetailChatFabReducer,
});
