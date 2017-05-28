
export const submitCompanyForm = (companies) => {
  console.log('submitting company form', companies);
  return {
    type    : "SUBMIT_COMPANY_FORM",
    payload : companies
  }
};