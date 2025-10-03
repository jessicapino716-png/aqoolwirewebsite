import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Trash2, Edit, Plus, Video, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useLocation } from 'wouter';

interface ToolVideo {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  displayOrder: number;
  createdAt: string;
}

const videoFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  youtubeUrl: z.string().url('Must be a valid YouTube URL'),
  displayOrder: z.number().int().min(0, 'Display order must be 0 or greater'),
});

type VideoFormData = z.infer<typeof videoFormSchema>;

export default function AdminToolVideos() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingVideo, setEditingVideo] = useState<ToolVideo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch videos
  const { data: videos = [], isLoading } = useQuery<ToolVideo[]>({
    queryKey: ['/api/tool-videos'],
  });

  // Form
  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: '',
      description: '',
      youtubeUrl: '',
      displayOrder: 0,
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: VideoFormData) => {
      return await apiRequest('/api/tool-videos', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tool-videos'] });
      toast({
        title: 'Success',
        description: 'Video added successfully',
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add video',
        variant: 'destructive',
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: VideoFormData }) => {
      return await apiRequest(`/api/tool-videos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tool-videos'] });
      toast({
        title: 'Success',
        description: 'Video updated successfully',
      });
      setIsDialogOpen(false);
      setEditingVideo(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update video',
        variant: 'destructive',
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/tool-videos/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tool-videos'] });
      toast({
        title: 'Success',
        description: 'Video deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete video',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (data: VideoFormData) => {
    if (editingVideo) {
      updateMutation.mutate({ id: editingVideo.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (video: ToolVideo) => {
    setEditingVideo(video);
    form.reset({
      title: video.title,
      description: video.description || '',
      youtubeUrl: video.youtubeUrl,
      displayOrder: video.displayOrder,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleNewVideo = () => {
    setEditingVideo(null);
    form.reset({
      title: '',
      description: '',
      youtubeUrl: '',
      displayOrder: videos.length,
    });
    setIsDialogOpen(true);
  };

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/admin/dashboard')}
            className="mb-4"
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-black" data-testid="text-page-title">
                AI Tool Videos
              </h1>
              <p className="text-gray-600 mt-2" data-testid="text-page-description">
                Manage YouTube videos for the AI Tools section
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleNewVideo} data-testid="button-add-video">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Video
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle data-testid="text-dialog-title">
                    {editingVideo ? 'Edit Video' : 'Add New Video'}
                  </DialogTitle>
                  <DialogDescription>
                    Enter the YouTube URL and details for the video
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="E.g., ChatGPT Tutorial" data-testid="input-title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Brief description of the video"
                              data-testid="input-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="youtubeUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>YouTube URL</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="https://www.youtube.com/watch?v=..." 
                              data-testid="input-youtube-url"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="displayOrder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Order</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="number"
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              data-testid="input-display-order"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex gap-2">
                      <Button 
                        type="submit" 
                        disabled={createMutation.isPending || updateMutation.isPending}
                        data-testid="button-submit"
                      >
                        {editingVideo ? 'Update' : 'Add'} Video
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsDialogOpen(false);
                          setEditingVideo(null);
                          form.reset();
                        }}
                        data-testid="button-cancel"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Videos List */}
        {isLoading ? (
          <div className="text-center py-8" data-testid="text-loading">
            <p className="text-gray-600">Loading videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <Card data-testid="card-no-videos">
            <CardHeader>
              <CardTitle>No Videos Yet</CardTitle>
              <CardDescription>
                Click "Add Video" to add your first YouTube video to the AI Tools section
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => {
              const videoId = extractVideoId(video.youtubeUrl);
              return (
                <Card key={video.id} data-testid={`card-video-${video.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg" data-testid={`text-video-title-${video.id}`}>
                          {video.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Order: {video.displayOrder}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(video)}
                          data-testid={`button-edit-${video.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(video.id)}
                          data-testid={`button-delete-${video.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {videoId && (
                      <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          data-testid={`img-video-thumbnail-${video.id}`}
                        />
                      </div>
                    )}
                    {video.description && (
                      <p className="text-sm text-gray-600 mb-2" data-testid={`text-video-description-${video.id}`}>
                        {video.description}
                      </p>
                    )}
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#3b82f6] hover:underline flex items-center gap-1"
                      data-testid={`link-video-url-${video.id}`}
                    >
                      <Video className="h-4 w-4" />
                      Watch on YouTube
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
