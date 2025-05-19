import Image from "next/image"
import { Star } from "lucide-react"
import aboutmain from "../../public/aboutmain.jpg"
import person1 from "../../public/person1.jpg"
import person2 from "../../public/person2.jpg"
import person3 from "../../public/person3.jpg"
import person4 from "../../public/person4.jpg"
import perico1 from "../../public/perico1.jpg"
import perico2 from "../../public/perico2.jpg"
import perico3 from "../../public/perico3.jpg"
// Sample team members data
const teamMembers = [
  {
    name: "Jay Arindam Maity",
    role: "Full Stack Developer",
    image: person1.src,
    bio: "Experienced full stack developer passionate about building scalable web applications and seamless user experiences.",
  },
  {
    name: "Karanpreet Singh",
    role: "Full Stack Developer",
    image: person2.src,
    bio: "Skilled in both front-end and back-end development, focusing on delivering high-quality, maintainable code.",
  },
  {
    name: "Karishma Dhawan",
    role: "Full Stack Developer",
    image: person3.src,
    bio: "Committed to crafting efficient and innovative solutions with a keen eye on performance and usability.",
  },
  {
    name: "Jasmine Rathore",
    role: "Full Stack Developer",
    image: person4.src,
    bio: "Passionate about integrating modern technologies to build robust and user-friendly web applications.",
  },
]

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "David Wilson",
    company: "Freelance Developer",
    image: perico2.src,
    quote:
      "CompeStore has been my go-to for all my tech needs. Their gaming PC builds are exceptional, and the customer service is unmatched. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    company: "Graphic Designer",
    image: perico1.src,
    quote:
      "As a designer, I need reliable equipment that can handle demanding creative software. The workstation I purchased from CompeStore has exceeded all my expectations.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chang",
    company: "E-sports Professional",
    image: perico3.src,
    quote:
      "The gaming peripherals from CompeStore give me the competitive edge I need. Fast shipping, quality products, and great prices. What more could you ask for?",
    rating: 4,
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-vt323 gradient-heading mb-8 text-center">About CompeStore</h1>

        <div className="glass-card rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-display mb-4">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2018, CompeStore began as a small passion project by a group of tech enthusiasts who wanted to
                create a different kind of computer store—one that combined cutting-edge technology with exceptional
                customer service and a unique retro-futuristic aesthetic.
              </p>
              <p className="text-gray-300 mb-4">
                What started as a small online shop quickly grew into a trusted destination for gamers, creators,
                developers, and tech enthusiasts of all kinds. Our commitment to quality, innovation, and customer
                satisfaction has remained at the core of everything we do.
              </p>
              <p className="text-gray-300">
                Today, CompeStore offers a carefully curated selection of high-performance computers, components, and
                peripherals, all backed by our technical expertise and dedication to helping our customers find the
                perfect tech solutions for their needs.
              </p>
            </div>

            <div className="relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden">
              <Image src={aboutmain} alt="CompeStore office" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-vt323 gradient-heading mb-8 text-center">Our Mission</h2>

        <div className="glass-card rounded-xl p-8 text-center max-w-3xl mx-auto">
          <p className="text-xl text-gray-300 italic">
            "To provide exceptional technology products with a unique retro-futuristic flair, backed by unparalleled
            expertise and customer service, empowering our customers to achieve their digital ambitions."
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-vt323 gradient-heading mb-8 text-center">Meet Our Team</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-64">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display mb-1">{member.name}</h3>
                <p className="text-orange-500 mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-vt323 gradient-heading mb-8 text-center">What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="glass-card rounded-xl p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? "fill-orange-500 text-orange-500" : "text-gray-600"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="text-gray-300 italic mb-6 flex-grow">"{testimonial.quote}"</blockquote>

              <div className="flex items-center mt-auto">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-vt323 gradient-heading mb-8 text-center">Our Values</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-pink-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-display mb-2">Quality</h3>
            <p className="text-gray-300">
              We never compromise on quality. Every product we offer is carefully selected and tested to ensure it meets
              our high standards.
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-pink-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-display mb-2">Innovation</h3>
            <p className="text-gray-300">
              We stay at the forefront of technological advancements, constantly updating our offerings to include the
              latest and greatest in tech.
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-pink-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-display mb-2">Community</h3>
            <p className="text-gray-300">
              We're more than just a store—we're a community of tech enthusiasts who share knowledge, experiences, and a
              passion for technology.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
