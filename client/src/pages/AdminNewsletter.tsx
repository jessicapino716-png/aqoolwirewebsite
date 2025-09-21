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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Edit, Trash2, ArrowLeft, Plus, Eye, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useLocation } from 'wouter';

interface NewsletterCampaign {
  id: string;
  title: string;
  subject: string;
  content: string;
  status: 'draft' | 'sent';
  createdAt: string;
  sentAt?: string;
  subscriberCount?: number;
  authorName: string;
}

interface SubscriberInfo {
  subscribers: { id: string; email: string; subscribedAt: string }[];
  count: number;
}

const campaignFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subject: z.string().min(1, 'Email subject is required'),
  content: z.string().min(1, 'Content is required'),
  authorName: z.string().min(1, 'Author name is required'),
});

type CampaignFormData = z.infer<typeof campaignFormSchema>;

export default function AdminNewsletter() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingCampaign, setEditingCampaign] = useState<NewsletterCampaign | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [previewCampaign, setPreviewCampaign] = useState<NewsletterCampaign | null>(null);

  // Fetch newsletter campaigns
  const { data: campaigns = [], isLoading, error } = useQuery<NewsletterCampaign[]>({
    queryKey: ['/api/newsletter/campaigns'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    queryFn: async () => {
      const response = await fetch('/api/newsletter/campaigns', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }
      return response.json();
    },
  });

  // Fetch subscriber info
  const { data: subscriberInfo } = useQuery<SubscriberInfo>({
    queryKey: ['/api/newsletter/subscribers'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    queryFn: async () => {
      const response = await fetch('/api/newsletter/subscribers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch subscribers');
      }
      return response.json();
    },
  });

  const createForm = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      title: '',
      subject: '',
      content: '',
      authorName: '',
    },
  });

  const editForm = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      title: '',
      subject: '',
      content: '',
      authorName: '',
    },
  });

  // Create campaign mutation
  const createMutation = useMutation({
    mutationFn: async (data: CampaignFormData) => {
      const response = await fetch('/api/newsletter/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create campaign');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/newsletter/campaigns'] });
      toast({
        title: "Campaign created",
        description: "Newsletter campaign has been created successfully.",
      });
      setIsCreateDialogOpen(false);
      createForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create campaign",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update campaign mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CampaignFormData> }) => {
      const response = await fetch(`/api/newsletter/campaigns/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update campaign');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/newsletter/campaigns'] });
      toast({
        title: "Campaign updated",
        description: "Newsletter campaign has been updated successfully.",
      });
      setIsEditDialogOpen(false);
      setEditingCampaign(null);
      editForm.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to update campaign",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete campaign mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/newsletter/campaigns/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete campaign');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/newsletter/campaigns'] });
      toast({
        title: "Campaign deleted",
        description: "Newsletter campaign has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to delete campaign",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  // Send campaign mutation
  const sendMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/newsletter/campaigns/${id}/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to send campaign');
      }
      return response.json();
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['/api/newsletter/campaigns'] });
      toast({
        title: "Newsletter sent!",
        description: `Successfully sent to ${data.subscriberCount} subscribers.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send newsletter",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreate = (data: CampaignFormData) => {
    createMutation.mutate(data);
  };

  const handleEdit = (campaign: NewsletterCampaign) => {
    setEditingCampaign(campaign);
    editForm.reset({
      title: campaign.title,
      subject: campaign.subject,
      content: campaign.content,
      authorName: campaign.authorName,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (data: CampaignFormData) => {
    if (editingCampaign) {
      updateMutation.mutate({ id: editingCampaign.id, data });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSend = (campaign: NewsletterCampaign) => {
    if (confirm(`Send "${campaign.title}" to all ${subscriberInfo?.count || 0} subscribers?`)) {
      sendMutation.mutate(campaign.id);
    }
  };

  const handlePreview = (campaign: NewsletterCampaign) => {
    setPreviewCampaign(campaign);
    setIsPreviewDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Campaigns</h1>
          <p className="text-gray-600 mb-4">Failed to load newsletter campaigns.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => setLocation('/admin')}
          data-testid="button-back-admin"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin
        </Button>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Management</h1>
          <p className="text-gray-600 mt-2">Create and send newsletters to your subscribers</p>
        </div>
        
        <div className="flex gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-sm text-gray-600">Subscribers</p>
                <p className="text-xl font-bold">{subscriberInfo?.count || 0}</p>
              </div>
            </div>
          </Card>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-campaign">
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Newsletter Campaign</DialogTitle>
                <DialogDescription>
                  Create a new newsletter to send to your subscribers.
                </DialogDescription>
              </DialogHeader>
              <Form {...createForm}>
                <form onSubmit={createForm.handleSubmit(handleCreate)} className="space-y-6">
                  <FormField
                    control={createForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Newsletter Title</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="AI Policy Update - Week of..."
                            data-testid="input-campaign-title"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={createForm.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Subject</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="This Week in AI Policy - Saudi Arabia"
                            data-testid="input-campaign-subject"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={createForm.control}
                    name="authorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="The Aqool Wire Team"
                            data-testid="input-campaign-author"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={createForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Newsletter Content (HTML supported)</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={10}
                            placeholder="<h2>This Week's Highlights</h2>
<p>Key developments in AI policy across the GCC...</p>
<ul>
<li><strong>Saudi Arabia</strong>: New AI governance framework announced</li>
<li><strong>UAE</strong>: Updated data protection regulations</li>
</ul>"
                            data-testid="textarea-campaign-content"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                      data-testid="button-cancel-create"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createMutation.isPending}
                      data-testid="button-save-campaign"
                    >
                      {createMutation.isPending ? 'Creating...' : 'Create Campaign'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-300 rounded mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-600 mb-6">Create your first newsletter campaign to get started.</p>
            <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-create-first-campaign">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign: NewsletterCampaign) => (
            <Card key={campaign.id} className="hover-elevate">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-2">{campaign.title}</CardTitle>
                    <CardDescription>By {campaign.authorName}</CardDescription>
                  </div>
                  <Badge variant={campaign.status === 'sent' ? 'default' : 'secondary'}>
                    {campaign.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="text-sm text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: campaign.content.substring(0, 150) + '...' 
                  }}
                />
                
                <div className="text-xs text-gray-500 mb-4">
                  <p>Created: {formatDate(campaign.createdAt)}</p>
                  {campaign.sentAt && (
                    <p>Sent: {formatDate(campaign.sentAt)} to {campaign.subscriberCount} subscribers</p>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePreview(campaign)}
                    data-testid={`button-preview-${campaign.id}`}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                  
                  {campaign.status === 'draft' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(campaign)}
                        data-testid={`button-edit-${campaign.id}`}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSend(campaign)}
                        disabled={sendMutation.isPending || !subscriberInfo?.count}
                        data-testid={`button-send-${campaign.id}`}
                      >
                        <Send className="w-3 h-3" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(campaign.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${campaign.id}`}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Newsletter Campaign</DialogTitle>
            <DialogDescription>
              Update your newsletter campaign details.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleUpdate)} className="space-y-6">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Newsletter Title</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-edit-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Subject</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-edit-subject" />
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
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-edit-author" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Newsletter Content (HTML supported)</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={10} data-testid="textarea-edit-content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-3">
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

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Newsletter Preview</DialogTitle>
            <DialogDescription>
              This is how your newsletter will appear to subscribers.
            </DialogDescription>
          </DialogHeader>
          {previewCampaign && (
            <div className="border rounded-lg p-6 bg-white">
              <div className="text-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold text-teal-600">
                  The Aqool <span className="text-yellow-500">(ai)</span>
                </h1>
                <p className="text-gray-600">AI Policy & Regulation News</p>
              </div>
              
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{previewCampaign.title}</h1>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: previewCampaign.content }}
                />
                <div className="mt-6 pt-4 border-t">
                  <p className="text-gray-600 italic">By {previewCampaign.authorName}</p>
                </div>
              </div>
              
              <div className="text-center pt-4 border-t text-sm text-gray-600">
                <p>
                  Straight from Riyadh • AI Policy & Regulation News<br />
                  <a href="mailto:newsletter@aqoolai.com" className="text-teal-600">newsletter@aqoolai.com</a>
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}