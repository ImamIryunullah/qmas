<template>
    <div>
      <h1>Generate ID Card</h1>
      <input v-model="nama" placeholder="Nama" />
      <input v-model="id" placeholder="ID" />
      <input v-model="jabatan" placeholder="Jabatan" />
      <input v-model="alamat" placeholder="alamat" />
      <button @click="generatePdf">Generate PDF</button>
    </div>
  </template>
  
  <script>
  import { PDFDocument, rgb } from 'pdf-lib'; // Import rgb dari pdf-lib
  
  export default {
    data() {
      return {
        nama: '',
        id: '',
        jabatan: '',
        alamat: '',
      };
    },
    methods: {
      async generatePdf() { 
        const existingPdfBytes = await fetch('/pusatmerah.pdf').then(res => res.arrayBuffer());    
        const pdfDoc = await PDFDocument.load(existingPdfBytes);    
        const page = pdfDoc.getPages()[0];
        page.drawText(this.nama, { x:70, y: 170, size: 12,color: rgb (1,1,1) });
        page.drawText(this.id, { x: 105, y: 125, size: 12, color: rgb (1,1,1) });
        page.drawText(this.jabatan, { x: 105, y: 115, size: 12, color: rgb (1,1,1) });
        page.drawText(this.alamat, { x: 105, y: 105, size: 12, color: rgb (1,1,1) });
        const pdfBytes = await pdfDoc.save();  
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'idcardpusatdepan.pdf';
        link.click();
      },
    },
  };
  </script>
  