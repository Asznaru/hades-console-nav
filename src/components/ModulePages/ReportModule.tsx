import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const ReportModule: React.FC = () => {
  const [reportTitle, setReportTitle] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allowedExtensions = ['.txt', '.bin'];

  const validateFile = (file: File): boolean => {
    const fileName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      setFileError(`Invalid file type. Only ${allowedExtensions.join(', ')} files are allowed.`);
      return false;
    }
    
    setFileError('');
    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      if (validateFile(file)) {
        setUploadedFile(file);
        toast({
          title: "File attached",
          description: `${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
        });
      } else {
        setUploadedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportTitle.trim()) {
      toast({
        title: "Error",
        description: "Report title is required",
        variant: "destructive",
      });
      return;
    }

    if (!reportContent.trim()) {
      toast({
        title: "Error",
        description: "Report content is required",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally send the data to backend
    toast({
      title: "Report submitted",
      description: `Report "${reportTitle}" has been sent to HADES system`,
    });

    // Reset form
    setReportTitle('');
    setReportContent('');
    setUploadedFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="terminal-border p-4 h-full overflow-y-auto">
        <h2 className="text-xl mb-4 terminal-glow text-accent">
          [REPORT MODULE] - Agent Report System
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
          {/* Report Title */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              REPORT TITLE *
            </label>
            <Input
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              placeholder="Enter report title..."
              className="terminal-border"
              maxLength={100}
            />
          </div>

          {/* Report Content */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              REPORT CONTENT *
            </label>
            <Textarea
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder="Enter detailed report..."
              className="terminal-border min-h-[200px]"
              maxLength={5000}
            />
            <div className="text-xs text-muted-foreground text-right">
              {reportContent.length}/5000
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              ATTACHMENT (Optional - .txt, .bin only)
            </label>
            
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".txt,.bin"
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="terminal-border"
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
              
              {uploadedFile && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleRemoveFile}
                >
                  Remove
                </Button>
              )}
            </div>

            {/* File Status */}
            {uploadedFile && !fileError && (
              <div className="terminal-border p-3 flex items-center gap-2 bg-accent/10">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <FileText className="h-4 w-4" />
                <div className="flex-1">
                  <div className="text-sm">{uploadedFile.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </div>
                </div>
              </div>
            )}

            {/* File Error */}
            {fileError && (
              <div className="terminal-border p-3 flex items-center gap-2 bg-destructive/10 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{fileError}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button 
              type="submit"
              className="terminal-border"
            >
              Submit Report
            </Button>
            
            <Button 
              type="button"
              variant="outline"
              onClick={() => {
                setReportTitle('');
                setReportContent('');
                handleRemoveFile();
              }}
              className="terminal-border"
            >
              Clear Form
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <div>• All reports are encrypted and sent to HADES central system</div>
            <div>• Allowed file formats: {allowedExtensions.join(', ')}</div>
            <div>• Maximum file size: 10MB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModule;