const jwt = require("jsonwebtoken");
const CertificateUpload = require("../models/certificateUpload");
const CertificateRequest = require("../models/certificateRequest");


const getVerifiedCertificates = async (req, res) => {
  
  const studentID = req.user.user.id;

  try {
    const verifiedCertificateUploads = await CertificateUpload.find({
      studentID,
      status: "Approved",
    });

    const verifiedCertificateRequests = await CertificateRequest.find({
      studentID,
      status: "Approved",
    }).populate("certificateID");

    res.status(200).json({
      certificateUploads: verifiedCertificateUploads,
      certificateRequests: verifiedCertificateRequests,
    });
  } catch (error) {
    console.error("Error fetching verified certificates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getVerifiedCertificates };
