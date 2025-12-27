export const services = [
  {
    id: "baby-care",
    name: "Baby Care",
    description:
      "Professional babysitting services for your little ones. Our trained caregivers ensure a safe and nurturing environment.",
    longDescription:
      "Our Baby Care service provides professional and loving care for your children. Whether you need a few hours of babysitting or full-day care, our experienced caregivers are here to help. All our babysitters undergo thorough background checks and are trained in child safety, first aid, and early childhood development. We understand that trusting someone with your child is a big decision, and we take that responsibility seriously.",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=2070",
    pricePerHour: 200,
    pricePerDay: 1500,
    features: [
      "Experienced and verified caregivers",
      "Background checked professionals",
      "First aid and CPR certified",
      "Age-appropriate activities and engagement",
      "Flexible scheduling options",
      "24/7 customer support",
      "Safe and nurturing environment",
      "Regular updates for parents",
    ],
  },
  {
    id: "elderly-care",
    name: "Elderly Care",
    description:
      "Compassionate care for your elderly family members. We provide companionship, medical assistance, and mobility support.",
    longDescription:
      "Our Elderly Care service is designed to provide compassionate and professional care for your senior family members. We understand the unique needs of elderly individuals and offer personalized care plans to ensure their comfort, safety, and well-being. Our caregivers are trained to assist with daily activities, medication management, mobility support, and provide meaningful companionship to combat loneliness.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2070",
    pricePerHour: 250,
    pricePerDay: 2000,
    features: [
      "Trained elderly care specialists",
      "Medication management and reminders",
      "Mobility and physical assistance",
      "Companionship and emotional support",
      "Meal preparation and nutrition monitoring",
      "Light housekeeping assistance",
      "Transportation to appointments",
      "24/7 emergency support",
    ],
  },
  {
    id: "sick-care",
    name: "Sick People Care",
    description:
      "Specialized care for sick individuals at home. Our caregivers assist with medication, health monitoring, and recovery.",
    longDescription:
      "Our Sick People Care service provides specialized home care for individuals recovering from illness, surgery, or managing chronic conditions. Our caregivers are trained to provide medical assistance, monitor health conditions, manage medications, and support the recovery process. We work closely with healthcare providers to ensure continuity of care and help patients recover in the comfort of their own homes.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070",
    pricePerHour: 300,
    pricePerDay: 2500,
    features: [
      "Medically trained caregivers",
      "Health monitoring and vital checks",
      "Medication administration",
      "Post-surgery recovery support",
      "Chronic disease management",
      "Wound care and dressing",
      "Coordination with healthcare providers",
      "Emergency response protocols",
    ],
  },
];

export const getServiceById = (id) => {
  return services.find((service) => service.id === id);
};

export const getAllServiceIds = () => {
  return services.map((service) => service.id);
};
