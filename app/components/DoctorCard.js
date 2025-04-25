import React, { useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import Link from 'next/link';

const DoctorCard = ({ doctor }) => {
  const [imageError, setImageError] = useState(false);
  const isGoogleImage = doctor.image?.includes('encrypted-tbn0.gstatic.com');
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="doctor-card" data-testid="doctor-card">
      <div className="flex flex-row gap-4">
        {/* Doctor Image and Info */}
        <div className="flex flex-row items-start gap-4 flex-1">
          {/* Doctor Image */}
          <div>
            {(doctor.image && !imageError) ? (
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className={`doctor-image ${isGoogleImage ? 'object-contain' : ''}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={handleImageError}
                data-testid="doctor-img"
              />
            ) : (
              <div className="doctor-image flex items-center justify-center bg-gray-100 text-gray-400">
                {doctor.name?.substring(0, 2).toUpperCase() || 'DR'}
              </div>
            )}
          </div>
          
          {/* Doctor Details */}
          <div className="flex-1">
            <h2 className="doctor-name" data-testid="doctor-name">
              {doctor.name}
            </h2>
            
            <div className="text-gray-700 mb-1" data-testid="doctor-specialty">
              {doctor.specialty && doctor.specialty[0] ? doctor.specialty[0] : 'General Physician'}
            </div>
            
            <div className="text-gray-500 text-sm mb-2">
              {doctor.qualifications || 'MBBS'} 
              {doctor.specialty && doctor.specialty.length > 1 && `, Diploma in ${doctor.specialty[1]}`}
            </div>
            
            <div className="text-gray-600 text-sm" data-testid="doctor-experience">
              {doctor.experience} yrs exp.
            </div>
            
            {/* Location and Clinic Info */}
            <div className="mt-3">
              <div className="flex items-center text-sm mb-1">
                <HiLocationMarker className="mr-2" size={16} />
                {doctor.clinicName || 'Clinic Name'}
              </div>
              <div className="flex items-center text-sm">
                <HiLocationMarker className="mr-2" size={16} />
                {doctor.address || 'Location'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Fee and Book Button */}
        <div className="flex flex-col items-end justify-between">
          <div className="fee-display mb-4" data-testid="doctor-fee">
            ₹ {doctor.fee}
          </div>
          
          <button className="book-btn">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard; 