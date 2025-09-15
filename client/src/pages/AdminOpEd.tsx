import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, FileText, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';

const opEdSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'URL slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  body: z.string().min(1, 'Article body is required'),
  authorName: z.string().min(1, 'Author name is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
});

type OpEdData = z.infer<typeof opEdSchema>;

export default function AdminOpEd() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<OpEdData>({
    resolver: zodResolver(opEdSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      body: '',
      authorName: '',
      category: '',
      tags: '',
      imageUrl: '',
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: OpEdData) => {
      const submissionData = {
        type: 'op-ed' as const,
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        imageUrl: data.imageUrl || undefined,
      };
      
      return apiRequest('POST', '/api/content', submissionData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      toast({
        title: 'Success',
        description: 'Op-Ed article created successfully!',
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create op-ed article',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: OpEdData) => {
    createMutation.mutate(data);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    form.setValue('title', title);
    if (!form.getValues('slug')) {
      form.setValue('slug', generateSlug(title));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h1 className="text-3xl font-bold text-gray-900" data-testid="text-op-ed-title">
                  Write Op-Ed Article
                </h1>
                <p className="text-gray-600 mt-1" data-testid="text-op-ed-subtitle">
                  Create original commentary and analysis content
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Op-Ed Article Details</span>
            </CardTitle>
            <CardDescription>
              Write and publish original commentary and analysis on AI policy and regulation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Article Title *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleTitleChange(e.target.value);
                          }}
                          placeholder="e.g., The Future of AI Governance in the Middle East"
                          data-testid="input-op-ed-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="the-future-of-ai-governance-in-the-middle-east"
                          data-testid="input-op-ed-slug"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Article Excerpt *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={3}
                          placeholder="Brief summary that will appear in article previews..."
                          data-testid="textarea-op-ed-excerpt"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Article Body *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={12}
                          placeholder="Write your full article content here..."
                          data-testid="textarea-op-ed-body"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="authorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Sarah Johnson"
                            data-testid="input-op-ed-author"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Opinion, Analysis, Commentary"
                            data-testid="input-op-ed-category"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., AI governance, Middle East, policy analysis"
                          data-testid="input-op-ed-tags"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL (optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          data-testid="input-op-ed-image"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setLocation('/admin')}
                    data-testid="button-cancel-op-ed"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending}
                    data-testid="button-submit-op-ed"
                  >
                    {createMutation.isPending ? (
                      'Publishing Article...'
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Publish Op-Ed
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}