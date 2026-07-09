"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTestimonials } from "../api/get-testimonials";
import { Testimonial } from "../types/api";

const chunkArray = (
  array: Testimonial[],
  chunkSize: number,
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const Testimonials = () => {
  const testimonialQuery = useTestimonials({
    page: 1,
    limit: 10,
    "filter.isActive": "$eq:true",
  });

  const testimonials = testimonialQuery?.data?.data;

  if (!testimonials || testimonials.length === 0) return null;

  const testimonialChunks = chunkArray(
    testimonials,
    Math.ceil(testimonials.length / 3),
  );

  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-384 px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Hear from Our Graduates</h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-3">
                {chunk.map(
                  ({ authorName, authorTitle, content, image }, index) => (
                    <Card key={index}>
                      <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                        <Avatar className="size-9">
                          <AvatarImage
                            alt={authorName}
                            src={image?.url}
                            loading="lazy"
                            width="120"
                            height="120"
                          />
                          <AvatarFallback>ST</AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-medium">{authorName}</h3>

                          <span className="text-muted-foreground block text-sm tracking-wide">
                            {authorTitle}
                          </span>

                          <blockquote className="mt-3">
                            <p className="">{content}</p>
                          </blockquote>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
