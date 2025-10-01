import { useState } from "react";
import type { ReactNode } from "react";
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/react";
import AwsS3 from "@uppy/aws-s3";

import type { UploadResult } from "@uppy/core";
import { Button } from "@/components/ui/button";

interface ObjectUploaderProps {
  maxNumberOfFiles?: number;
  maxFileSize?: number;
  onGetUploadParameters: () => Promise<{
    method: "PUT";
    url: string;
  }>;
  onComplete?: (
    result: UploadResult<Record<string, unknown>, Record<string, unknown>>
  ) => void;
  buttonClassName?: string;
  children: ReactNode;
}

/**
 * A file upload component that renders as a button and provides a modal interface for
 * file management.
 */
export function ObjectUploader({
  maxNumberOfFiles = 1,
  maxFileSize = 10485760, // 10MB default
  onGetUploadParameters,
  onComplete,
  buttonClassName,
  children,
}: ObjectUploaderProps) {
  const [showModal, setShowModal] = useState(false);
  const [uppy] = useState(() => 
    new Uppy({
      restrictions: {
        maxNumberOfFiles,
        maxFileSize,
        allowedFileTypes: ['image/*'], // Only allow images
      },
      autoProceed: false,
    })
      .use(AwsS3, {
        shouldUseMultipart: false,
        getUploadParameters: async (file) => {
          console.log('Getting upload parameters for file:', file.name);
          try {
            const params = await onGetUploadParameters();
            console.log('Received upload parameters:', params);
            return {
              method: params.method,
              url: params.url,
              headers: {
                'Content-Type': file.type || 'application/octet-stream',
              },
            };
          } catch (error) {
            console.error('Error getting upload parameters:', error);
            throw error;
          }
        },
      })
      .on("upload", (data) => {
        console.log('🔵 Upload started:', data);
        alert('Upload started!');
      })
      .on("upload-success", (file, response) => {
        console.log('🟢 Upload success:', { file: file?.name, response });
        alert('Upload success: ' + file?.name);
      })
      .on("upload-error", (file, error) => {
        console.error('🔴 Upload error:', { file: file?.name, error });
        alert('Upload error: ' + error?.message);
      })
      .on("complete", (result) => {
        console.log('✅ Upload complete:', result);
        alert('Upload complete! Successful: ' + (result.successful?.length || 0) + ', Failed: ' + (result.failed?.length || 0));
        onComplete?.(result);
        setShowModal(false);
      })
      .on("error", (error) => {
        console.error('❌ Uppy error:', error);
        alert('Uppy error: ' + error?.message);
      })
  );

  return (
    <div>
      <Button onClick={() => setShowModal(true)} className={buttonClassName} type="button">
        {children}
      </Button>

      {showModal && (
        <DashboardModal
          uppy={uppy}
          open={true}
          onRequestClose={() => setShowModal(false)}
          proudlyDisplayPoweredByUppy={false}
        />
      )}
    </div>
  );
}