"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// FAQ data
const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        id: "q1",
        question: "How long does shipping take?",
        answer:
          "Standard shipping typically takes 3-5 business days within the continental US. Expedited shipping options are available at checkout for faster delivery. International shipping times vary by location.",
      },
      {
        id: "q2",
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to most countries worldwide. International shipping costs and delivery times are calculated at checkout based on your location and the items in your cart.",
      },
      {
        id: "q3",
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account and viewing your order history.",
      },
      {
        id: "q4",
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for most items. Products must be returned in their original packaging and in new condition. Custom-built PCs have a 14-day return window. Please contact our support team to initiate a return.",
      },
    ],
  },
  {
    category: "Products & Compatibility",
    questions: [
      {
        id: "q5",
        question: "Are your computers customizable?",
        answer:
          "Yes, most of our pre-built systems can be customized. During the checkout process, you'll have options to upgrade components like RAM, storage, and graphics cards. For fully custom builds, please contact our support team.",
      },
      {
        id: "q6",
        question: "How do I know if a component is compatible with my system?",
        answer:
          "Our product pages include compatibility information for common systems. If you're unsure, you can use our compatibility checker tool or contact our support team with your system specifications for personalized assistance.",
      },
      {
        id: "q7",
        question: "Do you offer warranty on your products?",
        answer:
          "Yes, all our products come with a minimum 1-year warranty. Many components have extended manufacturer warranties. Custom-built PCs include a comprehensive 2-year parts and labor warranty.",
      },
    ],
  },
  {
    category: "Account & Payment",
    questions: [
      {
        id: "q8",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and various buy-now-pay-later options like Affirm and Klarna. For large orders, we also offer wire transfers.",
      },
      {
        id: "q9",
        question: "Is my payment information secure?",
        answer:
          "Absolutely. We use industry-standard encryption and security protocols to protect your payment information. We are PCI DSS compliant and never store your full credit card details on our servers.",
      },
      {
        id: "q10",
        question: "How do I reset my password?",
        answer:
          "You can reset your password by clicking the 'Forgot Password' link on the login page. We'll send a password reset link to your registered email address. For security reasons, password reset links expire after 24 hours.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        id: "q11",
        question: "Do you offer technical support for products purchased from CompeStore?",
        answer:
          "Yes, we provide technical support for all products purchased from us. Our support team is available via email, phone, and live chat during business hours. For complex issues, we also offer remote troubleshooting sessions.",
      },
      {
        id: "q12",
        question: "My computer isn't working properly. What should I do?",
        answer:
          "First, check our troubleshooting guides in the Support section. If the issue persists, contact our technical support team with details about the problem, including any error messages. For urgent issues, our phone support line is available Monday-Friday, 9am-6pm EST.",
      },
      {
        id: "q13",
        question: "How do I update drivers for my components?",
        answer:
          "We recommend using the manufacturer's official websites to download the latest drivers. For systems purchased from us, we include a driver utility that can automatically check for and install updates. You can also contact our support team for assistance.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  // Filter questions based on search query
  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // Check if a category is expanded
  const isCategoryExpanded = (category: string) => {
    return expandedCategories.includes(category)
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl md:text-4xl font-vt323 gradient-heading mb-8 text-center">Frequently Asked Questions</h1>

      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-gray-300 text-center mb-8">
          Find answers to common questions about our products, services, shipping, and more. If you can't find what
          you're looking for, feel free to contact our support team.
        </p>

        <div className="relative mb-8">
          {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
          <Input
            type="text"
            placeholder="Search for questions..."
            className="pl-10 retro-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredFAQs.length === 0 ? (
        <div className="glass-card rounded-xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-display mb-4">No results found</h3>
          <p className="text-gray-400 mb-6">We couldn't find any questions matching your search query.</p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredFAQs.map((category) => (
            <div key={category.category} className="glass-card rounded-xl p-6">
              <button
                className="flex justify-between items-center w-full text-left mb-4"
                onClick={() => toggleCategory(category.category)}
              >
                <h2 className="text-2xl font-display">{category.category}</h2>
                <span className="text-2xl">{isCategoryExpanded(category.category) ? "−" : "+"}</span>
              </button>

              {isCategoryExpanded(category.category) && (
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((q) => (
                    <AccordionItem key={q.id} value={q.id}>
                      <AccordionTrigger className="text-lg font-medium">{q.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-300">{q.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
