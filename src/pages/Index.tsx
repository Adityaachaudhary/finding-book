import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, AlertCircle, Loader2 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  publisher?: string[];
  isbn?: string[];
}

interface SearchResult {
  docs: Book[];
  numFound: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<'title' | 'author'>('title');

  const { data, isLoading, error } = useQuery({
    queryKey: ['books', searchQuery, searchType],
    queryFn: async () => {
      if (!searchQuery) return null;
      
      const searchParam = searchType === 'title' ? 'title' : 'author';
      const response = await fetch(
        `https://openlibrary.org/search.json?${searchParam}=${encodeURIComponent(searchQuery)}&limit=24`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      return response.json() as Promise<SearchResult>;
    },
    enabled: !!searchQuery,
  });

  const handleSearch = (query: string, type: 'title' | 'author') => {
    setSearchQuery(query);
    setSearchType(type);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djRoLTR2LTRoNHptMCAwdjRoNHYtNGgtNHptLTQgMHY0aC00di00aDR6bTAgMHYtNGg0djRoLTR6bTQtNHY0aDR2LTRoLTR6bTAgMGgtNHYtNGg0djR6bTAgNHY0aDR2LTRoLTR6bS00IDBoLTR2NGg0di00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/10 backdrop-blur-sm">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Discover Your Next Read
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Search millions of books by title or author. Find your perfect book from the Open Library collection.
            </p>
          </div>
          
          <div className="animate-slide-up">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Searching for books...</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to fetch books. Please check your connection and try again.
            </AlertDescription>
          </Alert>
        )}

        {data && data.numFound === 0 && (
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No books found for "{searchQuery}". Try a different search term.
            </AlertDescription>
          </Alert>
        )}

        {data && data.numFound > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Found {data.numFound.toLocaleString()} books
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing {data.docs.length} results
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.docs.map((book) => (
                <BookCard
                  key={book.key}
                  title={book.title}
                  author={book.author_name}
                  coverUrl={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                      : undefined
                  }
                  publishYear={book.first_publish_year}
                  publisher={book.publisher}
                  isbn={book.isbn}
                />
              ))}
            </div>
          </div>
        )}

        {!searchQuery && !isLoading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-primary/10">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-foreground">
              Start Your Book Journey
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Use the search bar above to discover books by title or author. 
              Explore millions of titles from the Open Library collection.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
