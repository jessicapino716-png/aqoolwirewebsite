import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react';

interface SimpleImageUploadProps {
  onUploadComplete: (imageUrl: string) => void;
  currentImageUrl?: string;
  onRemove?: () => void;
}

export function SimpleImageUpload({ onUploadComplete, currentImageUrl, onRemove }: SimpleImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be smaller than 10MB');
      return;
    }

    setError(null);
    setUploading(true);

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Upload to backend
      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful, image URL:', data.imageUrl);
      setError(null);
      onUploadComplete(data.imageUrl);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onRemove?.();
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
        data-testid="input-image-file"
      />

      {!preview && !currentImageUrl && (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full"
          data-testid="button-select-image"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Select Image
            </>
          )}
        </Button>
      )}

      {preview && (
        <div className="space-y-2">
          <div className="relative border rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover"
              data-testid="img-upload-preview"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">Image uploaded successfully</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              data-testid="button-remove-image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {currentImageUrl && !preview && (
        <div className="space-y-2">
          <div className="relative border rounded-lg overflow-hidden">
            <img
              src={currentImageUrl}
              alt="Current"
              className="w-full h-48 object-cover"
              data-testid="img-current-preview"
            />
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">Image attached</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              data-testid="button-remove-current-image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700" data-testid="text-upload-error">{error}</p>
        </div>
      )}
    </div>
  );
}
