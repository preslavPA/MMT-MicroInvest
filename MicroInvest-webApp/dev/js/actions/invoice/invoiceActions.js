

export const submitInvoiceForm = (invoices) => {
  console.log('submitting form', invoices);
  return {
    type    : "SUBMIT_INVOICE_FORM",
    payload : invoices
  }
};