import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { MedicineService } from './medicine.service';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('add')
  async addMedicine(@Body() medicineData) {
    return this.medicineService.addMedicine(medicineData);
  }

  @Put(':medicineId')
  async updateMedicineById(@Param('medicineId') medicineId: string, @Body() updateData) {
    return this.medicineService.updateMedicineById(medicineId, updateData);
  }

  @Get(':email')
  async getAllMedicinesByEmail(@Param('email') email: string) {
    return this.medicineService.getAllMedicinesByEmail(email);
  }
}
