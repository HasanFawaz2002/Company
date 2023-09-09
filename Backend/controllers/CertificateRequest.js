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
        { status: 'verified' },
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
  
      // Find the certificate request by ID, institution ID, and update its status
      const updatedRequest = await CertificateRequest.findOneAndUpdate(
        { _id: requestID, institutionID },
        { status: 'rejected' },
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
  
  const getPendingCertificateRequestsCount = async (req, res) => {
    try {
      const institutionID = req.user.institution.id;
  
      // Count the number of certificate requests with a "pending" status for the institution
      const pendingCount = await CertificateRequest.countDocuments({ institutionID, status: 'pending' });
  
      res.status(200).json({ pendingCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getVerifiedCertificateRequestsCount = async (req, res) => {
    try {
      const institutionID = req.user.institution.id;
  
      // Count the number of certificate requests with a "verified" status for the institution
      const verifiedCount = await CertificateRequest.countDocuments({ institutionID, status: 'verified' });
  
      res.status(200).json({ verifiedCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const getRejectedCertificateRequestsCount = async (req, res) => {
    try {
      const institutionID = req.user.institution.id;
  
      // Count the number of certificate requests with a "rejected" status for the institution
      const rejectedCount = await CertificateRequest.countDocuments({ institutionID, status: 'rejected' });
  
      res.status(200).json({ rejectedCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
 
  //the number of certificate for every institution
  const getCertificateCount = async (req, res) => {
    try {
      const institutionID = req.user.institution.id;
  
      // Count the number of certificate requests with a "rejected" status for the institution
      const Countofcertificate = await CertificateModel.countDocuments({ institutionID });
  
      res.status(200).json({ Countofcertificate });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  
  
  
  

 module.exports = {
    createCertificateRequest,getCertificateRequestsByUser,
    deleteCertificateRequest,getCertificateRequestsByInstitution,
    updateCertificateStatusToVerified,updateCertificateStatusToRejected,
    getPendingCertificateRequestsCount,getVerifiedCertificateRequestsCount,
    getRejectedCertificateRequestsCount,getCertificateCount
};

