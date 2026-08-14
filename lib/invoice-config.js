const path = require("path");

const invoiceConfigs = {
  "bnyc-qingdao": {
    clientSlug: "bnyc-qingdao",
    companyName: "Singapore Sing-China International Training Group Pte. Ltd.",
    companyDisplayName: "SINGAPORE SING-CHINA INTERNATIONAL TRAINING GROUP PTE. LTD.",
    companyAddress: ["42 Nanyang Avenue, Level 5", "Singapore 639815"],
    companyIdLabel: "UEN / GST Reg No.",
    companyIdValue: "200813020Z",
    invoiceTitle: "Tax Invoice/Receipt",
    programmeName: "BNYC Qingdao Trip",
    paymentMethod: "PayNow",
    currency: "SGD",
    amount: 1600,
    unitAmount: 1600,
    logoPath: path.join(__dirname, "..", "public", "SCITGlogo.png")
  }
};

function getInvoiceConfig(clientSlug) {
  return invoiceConfigs[clientSlug] || invoiceConfigs["bnyc-qingdao"];
}

module.exports = {
  getInvoiceConfig
};
