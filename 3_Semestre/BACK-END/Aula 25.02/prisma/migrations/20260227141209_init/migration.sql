/*
  Warnings:

  - A unique constraint covering the columns `[placa]` on the table `carro` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `carro` MODIFY `placa` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cliente` MODIFY `CPF` VARCHAR(191) NOT NULL,
    MODIFY `CNH` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `carro_placa_key` ON `carro`(`placa`);
