import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async addMedicine(@Body() medicineData) {
    return this.medicineService.addMedicine(medicineData.email, medicineData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':userEmail')
  async updateMedicineById(@Param('userEmail') userEmail: string, @Body() updateData) {
    return this.medicineService.updateMedicineById(userEmail, updateData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':email')
  async getAllMedicinesByEmail(@Param('email') email: string) {
    return this.medicineService.getAllMedicinesByEmail(email);
  }
}
