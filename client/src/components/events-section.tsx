import { events } from "@/lib/constants";
import { CalendarIcon, Clock, MapPin, Calendar } from "lucide-react";

export default function EventsSection() {
  const getCategoryBg = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary";
      case "secondary":
        return "bg-secondary";
      case "accent":
        return "bg-accent";
      default:
        return "bg-neutral-600";
    }
  };

  return (
    <section id="events" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-2">Upcoming Events</h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            Join us for these upcoming community events, workshops, and gatherings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg border border-neutral-200 flex flex-col h-full"
            >
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${getCategoryBg(event.categoryColor)} text-white text-sm font-bold py-1 px-3 rounded`}>
                    {event.category}
                  </div>
                  <div className="text-neutral-600 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-neutral-700 mb-4">{event.description}</p>
                <div className="flex items-center text-neutral-600 text-sm mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time}
                  <MapPin className="h-4 w-4 mx-2" />
                  {event.location}
                </div>
              </div>
              <div className="px-6 pb-6">
                <a 
                  href="#" 
                  className={`block text-center ${getCategoryBg(event.categoryColor)} text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-150`}
                >
                  {event.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center bg-white border-2 border-primary text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary hover:text-white transition duration-150"
          >
            View All Events
            <Calendar className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
