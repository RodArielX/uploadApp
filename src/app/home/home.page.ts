import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  selectedFile: File | null = null;
  uploadMessage = '';

  constructor(private supabaseService: SupabaseService) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadFile() {
    if (!this.selectedFile) return;

    const filePath = `uploads/${Date.now()}_${this.selectedFile.name}`;
    const { error } = await this.supabaseService.uploadFile('archivos', filePath, this.selectedFile);

    this.uploadMessage = error ? `Error: ${error.message}` : 'Archivo subido exitosamente!';
  }
}
