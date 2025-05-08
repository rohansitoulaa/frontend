import { useState, useEffect, useCallback } from 'react';
import Button from '../../components/common/Button/Button';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// ✅ PDF.js worker
import '../../pdfWorkerSetup';

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const Step3 = ({ onNext, onBack }: StepProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const storedMeta = localStorage.getItem('uploadedPdfMeta');
    if (storedMeta) {
      const { name, size, type, url } = JSON.parse(storedMeta);
      setSelectedFile(new File([], name, { type }));
      setPdfUrl(url);
    }

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, []);

  // ✅ Handle valid file
  const handleFile = useCallback((file: File) => {
    if (file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setSelectedFile(file);
      setPdfUrl(url);
      setError('');

      // Store metadata + object URL
      localStorage.setItem(
        'uploadedPdfMeta',
        JSON.stringify({
          name: file.name,
          size: file.size,
          type: file.type,
          url,
        })
      );
    } else {
      setError('Please upload a valid PDF file.');
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPdfUrl(null);
    setError('');
    localStorage.removeItem('uploadedPdfMeta');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div className="flex flex-col justify-center items-center relative z-10 w-full max-w-3xl mx-auto p-6 overflow-y-auto max-h-[90vh] bg-linear-65 from-[#f2f2f2] to-[#b2d1e8] shadow-xl rounded-2xl">
        <div className="flex flex-col gap-3 items-center justify-center">
          <img src="images/addFile.png" alt="Add File" />
          <h1>Upload your PDF file</h1>
        </div>

        <div className="mt-4 w-full">
          {!selectedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex flex-col items-center justify-center border-2 border-black bg-linear-65 from-[#f2f2f2] to-[#a9bccb] rounded-lg w-full py-10 text-center cursor-pointer relative"
            >
              <p>Drag and Drop</p>
              <p>or</p>
              <label htmlFor="pdf-upload">
                <Button btnTheme="noBg" value="+ Add file" />
              </label>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>
          ) : (
            <div className="relative border-2 border-dashed border-black bg-white rounded-lg w-full py-10 px-6 text-center overflow-y-auto max-h-[300px]">
              <button
                onClick={handleRemove}
                className="absolute top-2 right-4 text-red-600 text-sm underline hover:opacity-80"
              >
                Remove
              </button>

              <div className="mb-4 flex items-center gap-3 justify-center">
                <img src="/images/PDF.png" alt="file-icon" className="w-6 h-6" />
                <div>
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {pdfUrl && (
                <div className="h-[400px] overflow-hidden">
                  <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center w-full mt-6">
          <Button onClick={onBack} btnTheme="borderBlack" chevronPosition="left" value="Back" />
          <Button
            onClick={onNext}
            disabled={!selectedFile}
            btnTheme="blackBtn"
            chevronPosition="right"
            value="Next"
            className={!selectedFile ? 'cursor-not-allowed opacity-50' : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
