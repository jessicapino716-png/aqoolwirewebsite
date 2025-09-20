import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trash2, Edit, ExternalLink, ArrowLeft, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useLocation } from 'wouter';

interface ContentItem {
  id: string;
  type: 'external' | 'op-ed';
  title: string;
  slug: string;
  excerpt: string;
  body?: string;
  source?: string;
  externalUrl?: string;
  authorName: string;
  authorId?: string;
  category: string;
  tags: string[];
  imageUrl?: string;
  publishedAt: string;
  commentsCount: number;
}

const editFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string(),
  authorName: z.string().min(1, 'Author name is required'),
  imageUrl: z.string().optional(),
  body: z.string().optional(),
  source: z.string().optional(),
  externalUrl: z.string().optional(),
});

type EditFormData = z.infer<typeof editFormSchema>;

export default function AdminContent() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'external' | 'op-ed'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Fetch content with filters
  const { data: content = [], isLoading, error } = useQuery<ContentItem[]>({
    queryKey: ['/api/content', filterType, filterCategory, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterType !== 'all') params.append('type', filterType);
      if (filterCategory && filterCategory !== 'all') params.append('category', filterCategory);
      
      const url = `/api/content${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch content');
      return await response.json() as ContentItem[];
    },
  });

  // Filter content by search term
  const filteredContent = content.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get unique categories for filter
  const categories = Array.from(new Set(content.map(item => item.category)));

  // Edit form
  const editForm = useForm<EditFormData>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      category: '',
      tags: '',
      authorName: '',
      imageUrl: '',
      body: '',
      source: '',
      externalUrl: '',
    },
  });

  // Update content mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EditFormData }) => {
      const updateData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      };
      
      return apiRequest('PATCH', `/api/content/${id}`, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      setIsEditDialogOpen(false);
      setEditingContent(null);
      toast({
        title: 'Success',
        description: 'Content updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update content',
        variant: 'destructive',
      });
    },
  });

  // Delete content mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/content/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({
        title: 'Success',
        description: 'Content deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete content',
        variant: 'destructive',
      });
    },
  });

  const handleEdit = (item: ContentItem) => {
    setEditingContent(item);
    editForm.reset({
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      tags: item.tags.join(', '),
      authorName: item.authorName,
      imageUrl: item.imageUrl || '',
      body: item.body || '',
      source: item.source || '',
      externalUrl: item.externalUrl || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmitEdit = (data: EditFormData) => {
    if (!editingContent) return;
    updateMutation.mutate({ id: editingContent.id, data });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-red-600">Error loading content: {(error as Error).message}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setLocation('/admin')}
                data-testid="button-back-to-dashboard"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900" data-testid="text-content-management-title">
                  Content Management
                </h1>
                <p className="text-gray-600 mt-1" data-testid="text-content-management-subtitle">
                  Edit and manage all published content
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-content"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                  <SelectTrigger data-testid="select-filter-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="external">External Articles</SelectItem>
                    <SelectItem value="op-ed">Op-Ed Articles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger data-testid="select-filter-category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterCategory('all');
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredContent.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600" data-testid="text-no-content">
                {searchTerm || filterType !== 'all' || (filterCategory && filterCategory !== 'all')
                  ? 'No content found matching your filters.' 
                  : 'No content available. Create your first article to get started.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow" data-testid={`card-content-${item.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge 
                          variant={item.type === 'external' ? 'secondary' : 'default'}
                          data-testid={`badge-type-${item.id}`}
                        >
                          {item.type === 'external' ? 'External' : 'Op-Ed'}
                        </Badge>
                        <Badge variant="outline" data-testid={`badge-category-${item.id}`}>
                          {item.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2" data-testid={`text-title-${item.id}`}>
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600" data-testid={`text-author-${item.id}`}>
                        By {item.authorName}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4" data-testid={`text-excerpt-${item.id}`}>
                    {item.excerpt}
                  </p>
                  
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs" data-testid={`badge-tag-${item.id}-${tag}`}>
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span data-testid={`text-date-${item.id}`}>
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </span>
                    <span data-testid={`text-comments-${item.id}`}>
                      {item.commentsCount} comments
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(item)}
                      data-testid={`button-edit-${item.id}`}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    
                    {item.externalUrl && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => window.open(item.externalUrl, '_blank')}
                        data-testid={`button-view-external-${item.id}`}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDelete(item.id)}
                      data-testid={`button-delete-${item.id}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle data-testid="text-edit-dialog-title">
                Edit {editingContent?.type === 'external' ? 'External Article' : 'Op-Ed Article'}
              </DialogTitle>
              <DialogDescription>
                Make changes to your content. All fields marked with * are required.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onSubmitEdit)} className="space-y-6">
                <FormField
                  control={editForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-edit-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt *</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} data-testid="textarea-edit-excerpt" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-edit-category" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={editForm.control}
                    name="authorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author Name *</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-edit-author" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={editForm.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma-separated)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., AI, policy, regulation" data-testid="input-edit-tags" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} type="url" data-testid="input-edit-image-url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {editingContent?.type === 'external' ? (
                  <>
                    <FormField
                      control={editForm.control}
                      name="source"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Source</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Wall Street Journal" data-testid="input-edit-source" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="externalUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>External URL</FormLabel>
                          <FormControl>
                            <Input {...field} type="url" data-testid="input-edit-external-url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  <FormField
                    control={editForm.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Article Body</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={8} data-testid="textarea-edit-body" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                    data-testid="button-cancel-edit"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={updateMutation.isPending}
                    data-testid="button-save-edit"
                  >
                    {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}