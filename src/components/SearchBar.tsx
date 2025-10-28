import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchBarProps {
  onSearch: (query: string, searchType: 'title' | 'author') => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<'title' | 'author'>('title');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={searchType} onValueChange={(value: 'title' | 'author') => setSearchType(value)}>
          <SelectTrigger className="w-full sm:w-[140px] bg-card border-input">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">By Title</SelectItem>
            <SelectItem value="author">By Author</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            placeholder={`Search for books by ${searchType}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-card border-input"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
