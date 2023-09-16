const asyncHandler = require("express-async-handler");
const CertificateRequest = require("../models/certificateRequest");
const UserModel = require("../models/user");
const InstitutionModel=require("../models/institution");
const FormModel=require("../models/form");
const CertificateModel=require("../models/certificate");

const createCertificateRequest = async (req, res) => {
  try {
    const userID = req.user.user.id;
    const { institutionID, formID, certificateID } = req.params;

    // Check if there is an existing request with the same user, institution, certificate, and status (pending or verified)
    const existingRequest = await CertificateRequest.findOne({
      studentID: userID,
      institutionID,
      certificateID,
      status: { $in: ['pending', 'verified'] },
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending or verified request for this certificate.' });
    }

    // Validate if the user, institution, form, and certificate exist
    const [userExists, institutionExists, formExists, certificateExists] = await Promise.all([
      UserModel.exists({ _id: userID }),
      InstitutionModel.exists({ _id: institutionID }),
      FormModel.exists({ _id: formID }),
      CertificateModel.exists({ _id: certificateID }),
    ]);

    if (!userExists || !institutionExists || !formExists || !certificateExists) {
      return res.status(404).json({ message: 'User, Institution, Form, or Certificate does not exist.' });
    }

    // Create a new certificate request
    const certificateRequest = new CertificateRequest({
      studentID: userID,
      institutionID,
      formID,
      certificateID,
      status: 'pending', // You can set the default status here
    });

    // Save the certificate request
    await certificateRequest.save();

    res.status(201).json({ message: 'Certificate request submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


  const getCertificateRequestsByUser = async (req, res) => {
    try {
      const userID = req.user.user.id;
  
      // Find certificate requests for the user
      const certificateRequests = await CertificateRequest.find({ studentID: userID });
  
      res.status(200).json(certificateRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const deleteCertificateRequest = async (req, res) => {
    try {
      const { requestID } = req.params;
      const userID = req.user.user.id; // Get the user ID from the token
  
      // Find the certificate request by ID and owner (user)
      const request = await CertificateRequest.findOne({ _id: requestID, studentID: userID });
  
      if (!request) {
        return res.status(404).json({ message: 'Certificate request not found or unauthorized.' });
      }
  
      // Delete the request
      await CertificateRequest.deleteOne({ _id: requestID });
  
      res.status(200).json({ message: 'Certificate request deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getCertificateRequestsByInstitution = async (req, res) => {
    try {
      const institutionID = req.user.institution.id; // Get the institution ID from the token
  
      // Find certificate requests for the institution
      const certificateRequests = await CertificateRequest.find({ institutionID });
  
      res.status(200).json(certificateRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const updateCertificateStatusToVerified = async (req, res) => {
    try {
      const { requestID } = req.params;
      const institutionID = req.user.institution.id;
  
      // Find the certificate request by ID, institution ID, and update its status
      const updatedRequest = await CertificateRequest.findOneAndUpdate(
        { _id: requestID, institutionID },
        { status: 'Approved' },
        { new: true } // To get the updated document
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ message: 'Certificate request not found or unauthorized.' });
      }
  
      res.status(200).json({ message: 'Certificate request status updated to verified.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const updateCertificateStatusToRejected = async (req, res) => {
    try {
      const { requestID } = req.params;
      const institutionID = req.user.institution.id;
      const {  reason } = req.body;
  
      // Find the certificate request by ID, institution ID, and update its status
      const updatedRequest = await CertificateRequest.findOneAndUpdate(
        { _id: requestID, institutionID },
        { status: 'Rejected',reason },
        { new: true } // To get the updated document
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ message: 'Certificate request not found or unauthorized.' });
      }
  
      res.status(200).json({ message: 'Certificate request status updated to rejected.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getCertificateRequestsCount = asyncHandler(async (req, res) => {
    try {
      // Extract the institution ID from the JWT token
      const institutionIDFromToken = req.user.institution.id;
  
      // Define valid status values (you can customize this)
      const validStatusValues = ['Pending', 'Approved', 'Rejected'];
  
      // Count requests with different status values for the institution
      const counts = {};
  
      for (const status of validStatusValues) {
        counts[status] = await CertificateRequest.countDocuments({
          institutionID: institutionIDFromToken,
          status: status,
        });
      }
  
      // Count all requests for the institution
      const totalCount = await CertificateRequest.countDocuments({
        institutionID: institutionIDFromToken,
      });
  
      // Construct the response object
      const response = {
        message: "Certificate requests retrieved successfully",
        requestCounts: {
          ...counts,
          totalRequests: totalCount,
        },
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error("Error retrieving certificate requests:", error);
      res.status(500).json({
        message: "Error retrieving certificate requests",
        error: error.message,
      });
    }
  });
  
  
  
  //For SuperAdmin--------
  const getAllPendingCertificateRequestsCount = async (req, res) => {
    try {
      const institutionID = req.user.institution.id;
  
      if(institutionID){
        // Count the number of certificate requests with a "pending" status for the institution
      const pendingCount = await CertificateRequest.countDocuments({status: 'pending' });
      res.status(200).json({ pendingCount });
      }else {
        res.status(400).json({ message: 'Institution ID not provided in the request' });
      }      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getAllVerifiedCertificateRequestsCount = async (req, res) => {
    try {
      const institutionID = req.user.institution.id;
  
      // Count the number of certificate requests with a "verified" status for the institution
      if(institutionID){
        const verifiedCount = await CertificateRequest.countDocuments({status: 'verified' });
        res.status(200).json({ verifiedCount });
        }else {
          res.status(400).json({ message: 'Institution ID not provided in the request' });
        }   
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getAllRejectedCertificateRequestsCount = async (req, res) => {
    try {
      const institutionID = req.user.institution.id;
  
      // Count the number of certificate requests with a "rejected" status for the institution
      if(institutionID){
      const rejectedCount = await CertificateRequest.countDocuments({status: 'rejected' });
      res.status(200).json({ rejectedCount });
      }else {
        res.status(400).json({ message: 'Institution ID not provided in the request' });
      } 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getAllCertificateCount = async (req, res) => {
    try {
      const institutionID = req.user.institution.id;
  
      // Count the number of certificate requests with a "rejected" status for the institution
      if(institutionID){
      const Countofcertificate = await CertificateModel.countDocuments();
      res.status(200).json({ Countofcertificate });
      }else {
        res.status(400).json({ message: 'Institution ID not provided in the request' });
      } 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

 module.exports = {
    createCertificateRequest,getCertificateRequestsByUser,
    deleteCertificateRequest,getCertificateRequestsByInstitution,
    updateCertificateStatusToVerified,updateCertificateStatusToRejected,
    getCertificateRequestsCount,getAllPendingCertificateRequestsCount,getAllVerifiedCertificateRequestsCount,
    getAllRejectedCertificateRequestsCount,getAllCertificateCount
};

