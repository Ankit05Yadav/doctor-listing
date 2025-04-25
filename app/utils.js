export const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

// Default doctor images
const DOCTOR_IMAGES = {
  male1: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?size=338&ext=jpg',
  male2: 'https://img.freepik.com/free-photo/young-male-doctor-wearing-white-coat-stethoscope-looking-confident_114579-25564.jpg?size=338&ext=jpg',
  male3: 'https://img.freepik.com/free-photo/portrait-doctor_144627-39387.jpg?size=338&ext=jpg',
  male4: 'https://img.freepik.com/free-photo/handsome-young-male-doctor-with-stethoscope-standing-against-blue-background_662251-337.jpg?size=338&ext=jpg',
  female1: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?size=338&ext=jpg'
};

export const fetchDoctors = async () => {
  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      console.error(`API responded with status: ${res.status}`);
      throw new Error(`Failed to fetch doctors: ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log('Doctors data loaded:', data.length);
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    
    // Fallback to sample data for development purposes
    return getSampleDoctors();
  }
};

// Fallback sample data in case the API fails
const getSampleDoctors = () => {
  return [
    {
      id: "1",
      name: "Dr. Munaf Inamdar",
      specialty: ["General Physician", "General Medicine"],
      image: DOCTOR_IMAGES.male1,
      address: "Kondhwa Khurd",
      experience: 27,
      fee: 600,
      consultationMode: ["Video Consult", "In Clinic"],
      availability: ["Mon", "Wed", "Fri"],
      qualifications: "MBBS, MD",
      clinicName: "Apex Multispeciality and Maternity"
    },
    {
      id: "2",
      name: "Dr. Subhash Bajaj",
      specialty: ["General Physician", "Cardiology"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8vSRSoGYohA2SWO0qLf784n1Lrq52HL7LdA&s",
      address: "Wanowrie",
      experience: 11,
      fee: 600,
      consultationMode: ["In Clinic"],
      availability: ["Tue", "Thu", "Sat"],
      qualifications: "MBBS, Diploma in Cardiology",
      clinicName: "Dr. Bajaj Wellness Clinic"
    },
    {
      id: "3",
      name: "Dr. Mufaddal Zakir",
      specialty: ["General Physician"],
      image: DOCTOR_IMAGES.male3,
      address: "Wanwadi",
      experience: 27,
      fee: 600,
      consultationMode: ["Video Consult", "In Clinic"],
      availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      qualifications: "MBBS",
      clinicName: "Sparsh Polyclinic"
    },
    {
      id: "4",
      name: "Dr. Ajay Gangoli",
      specialty: ["General Physician"],
      image: DOCTOR_IMAGES.male1,
      address: "Wanowrie",
      experience: 34,
      fee: 400,
      consultationMode: ["In Clinic"],
      availability: ["Mon", "Wed", "Fri"],
      qualifications: "MBBS",
      clinicName: "Venaayya Clinic"
    }
  ];
};

export const searchDoctors = (doctors, searchQuery) => {
  if (!searchQuery) return doctors;
  
  const query = searchQuery.toLowerCase();
  return doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(query)
  );
};

export const getTopSuggestions = (doctors, searchQuery) => {
  if (!searchQuery) return [];
  
  const filteredDoctors = searchDoctors(doctors, searchQuery);
  return filteredDoctors.slice(0, 3);
};

export const getAllSpecialties = (doctors) => {
  const specialtiesSet = new Set();
  
  doctors.forEach(doctor => {
    doctor.specialty.forEach(spec => {
      specialtiesSet.add(spec);
    });
  });
  
  return Array.from(specialtiesSet).sort();
};

export const filterDoctors = (doctors, filters) => {
  let filteredDoctors = [...doctors];
  
  // Filter by search query
  if (filters.searchQuery) {
    filteredDoctors = searchDoctors(filteredDoctors, filters.searchQuery);
  }
  
  // Filter by consultation type
  if (filters.consultType) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.consultationMode.includes(filters.consultType)
    );
  }
  
  // Filter by specialties
  if (filters.specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      filters.specialties.some(specialty => doctor.specialty.includes(specialty))
    );
  }
  
  // Sort by fees or experience
  if (filters.sortBy === 'fees') {
    filteredDoctors = filteredDoctors.sort((a, b) => a.fee - b.fee);
  } else if (filters.sortBy === 'experience') {
    filteredDoctors = filteredDoctors.sort((a, b) => b.experience - a.experience);
  }
  
  return filteredDoctors;
}; 