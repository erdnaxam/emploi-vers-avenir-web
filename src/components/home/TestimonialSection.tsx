
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Grâce à ce programme, j'ai repris confiance en moi et j'ai pu décrocher un emploi après 6 mois de chômage. L'approche pas à pas m'a permis de me sentir moins dépassée.",
    author: "Marie L.",
    position: "Assistante administrative"
  },
  {
    id: 2,
    quote: "Les étapes claires et les ressources adaptées m'ont guidé efficacement. J'ai particulièrement apprécié l'aide pour préparer mes entretiens, ça a fait toute la différence.",
    author: "Thomas R.",
    position: "Technicien de maintenance"
  },
  {
    id: 3,
    quote: "En tant que personne en situation de handicap, j'ai trouvé ce parcours très accessible. Les formats audio et les explications simples m'ont beaucoup aidé.",
    author: "Sophie M.",
    position: "Chargée de clientèle"
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Ils ont réussi leur parcours</h2>
          <p className="text-lg text-muted-foreground">
            Découvrez les témoignages de personnes qui ont utilisé notre plateforme pour trouver un emploi.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white">
              <CardContent className="pt-6 pb-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="italic mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                    <span className="font-bold text-muted-foreground">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
