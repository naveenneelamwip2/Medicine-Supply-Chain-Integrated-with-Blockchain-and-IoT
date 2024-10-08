import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { MedicineService } from './medicine.service';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post()
  async addMedicine(@Body() medicineData) {
    return this.medicineService.addMedicine(medicineData.email, medicineData);
  }

  @Put(':userEmail')
  async updateMedicineById(@Param('userEmail') userEmail: string, @Body() updateData) {
    return this.medicineService.updateMedicineById(userEmail, updateData);
  }

  @Get(':email')
  async getAllMedicinesByEmail(@Param('email') email: string) {
    return this.medicineService.getAllMedicinesByEmail(email);
  }
}
