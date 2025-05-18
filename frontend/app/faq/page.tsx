"use client"

import { useState } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
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
          "Standard shipping typically takes 3-5 business days within the continental US. Expedited shipping options are available at checkout for faster delivery.",
      },
      {
        id: "q2",
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to most countries worldwide. International shipping costs and delivery times are calculated at checkout.",
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
          "Yes, most of our pre-built systems can be customized. During the checkout process, you'll have options to upgrade components.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Filter questions based on search query
  const filteredFAQs = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Check if a category is expanded
  const isCategoryExpanded = (category: string) => {
    return expandedCategories.includes(category);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl md:text-4xl font-vt323 gradient-heading mb-8 text-center">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
          <p className="text-gray-400 mb-6">
            We couldn't find any questions matching your search query.
          </p>
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
                <span className="text-2xl">
                  {isCategoryExpanded(category.category) ? "−" : "+"}
                </span>
              </button>

              {isCategoryExpanded(category.category) && (
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((question) => (
                    <AccordionItem key={question.id} value={question.id}>
                      <AccordionTrigger>{question.question}</AccordionTrigger>
                      <AccordionContent>{question.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}