import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  title: string;
  author?: string[];
  coverUrl?: string;
  publishYear?: number;
  publisher?: string[];
  isbn?: string[];
}

const BookCard = ({ title, author, coverUrl, publishYear, publisher, isbn }: BookCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:scale-[1.02] animate-fade-in">
      <CardContent className="p-0">
        <div className="aspect-[2/3] relative overflow-hidden bg-muted">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`${title} cover`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300x450?text=No+Cover';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <span className="text-4xl text-muted-foreground">📚</span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          {author && author.length > 0 && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              by {author.join(", ")}
            </p>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {publishYear && (
              <Badge variant="secondary" className="text-xs">
                {publishYear}
              </Badge>
            )}
            {publisher && publisher.length > 0 && (
              <Badge variant="outline" className="text-xs line-clamp-1">
                {publisher[0]}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
