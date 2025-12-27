import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Fatima Rahman",
      role: "Working Mother",
      content:
        "CareNest has been a lifesaver for our family. The babysitter they provided is amazing with our kids. Highly recommended!",
      rating: 5,
    },
    {
      name: "Kamal Hossain",
      role: "Son of Elderly Parents",
      content:
        "Finding reliable care for my elderly parents was so difficult until I found CareNest. The caregivers are professional and caring.",
      rating: 5,
    },
    {
      name: "Nusrat Jahan",
      role: "Daughter",
      content:
        "When my mother was sick, CareNest provided excellent home care. The caregiver was skilled and compassionate. Thank you!",
      rating: 5,
    },
  ];

  const stats = [
    { value: "10,000+", label: "Happy Families" },
    { value: "500+", label: "Verified Caregivers" },
    { value: "8", label: "Divisions Covered" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-base-content/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Hear from families who have experienced the CareNest difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-base-200">
              <div className="card-body">
                <Quote className="text-primary/30" size={32} />
                <p className="text-base-content/80 italic mb-4">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-base-content/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
