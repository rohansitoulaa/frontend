import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min?url';

// Tell pdfjs where to load the worker from
GlobalWorkerOptions.workerSrc = pdfWorker;
