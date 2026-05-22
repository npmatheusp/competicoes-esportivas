-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema competicoes_esportivas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema competicoes_esportivas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `competicoes_esportivas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `competicoes_esportivas` ;

-- -----------------------------------------------------
-- Table `competicoes_esportivas`.`atletas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `competicoes_esportivas`.`atletas` (
  `atl_cpf` VARCHAR(14) NOT NULL,
  `atl_rg` VARCHAR(20) NULL DEFAULT NULL,
  `atl_orgao_emissor` VARCHAR(20) NULL DEFAULT NULL,
  `atl_nome` VARCHAR(150) NOT NULL,
  `atl_data_nasc` DATE NOT NULL,
  `atl_endereco` VARCHAR(200) NULL DEFAULT NULL,
  `atl_bairro` VARCHAR(100) NULL DEFAULT NULL,
  `atl_municipio` VARCHAR(100) NULL DEFAULT NULL,
  `atl_cep` VARCHAR(20) NULL DEFAULT NULL,
  `atl_uf` VARCHAR(2) NULL DEFAULT NULL,
  `atl_telefone` VARCHAR(20) NULL DEFAULT NULL,
  `atl_celular` VARCHAR(20) NULL DEFAULT NULL,
  `atl_email` VARCHAR(150) NOT NULL,
  `atl_categoria` VARCHAR(50) NULL DEFAULT NULL,
  `atl_faixa_etaria` VARCHAR(50) NULL DEFAULT NULL,
  `atl_clube` VARCHAR(150) NULL DEFAULT NULL,
  `atl_peso` DECIMAL(5,2) NULL DEFAULT NULL,
  `atl_altura` DECIMAL(5,2) NULL DEFAULT NULL,
  `atl_restricao_medica` TEXT NULL DEFAULT NULL,
  `atl_emergencia_nome` VARCHAR(150) NULL DEFAULT NULL,
  `atl_emergencia_telefone` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`atl_cpf`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `competicoes_esportivas`.`modalidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `competicoes_esportivas`.`modalidades` (
  `mod_id` INT NOT NULL AUTO_INCREMENT,
  `mod_nome` VARCHAR(100) NOT NULL,
  `mod_categoria` VARCHAR(50) NULL DEFAULT NULL,
  `mod_faixa_etaria` VARCHAR(50) NULL DEFAULT NULL,
  `mod_vagas` INT NULL DEFAULT NULL,
  `mod_local` VARCHAR(150) NULL DEFAULT NULL,
  `mod_descricao` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`mod_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `competicoes_esportivas`.`inscricoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `competicoes_esportivas`.`inscricoes` (
  `ins_id` INT NOT NULL AUTO_INCREMENT,
  `atl_cpf` VARCHAR(14) NULL DEFAULT NULL,
  `mod_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`ins_id`),
  INDEX `fk_inscricao_atleta` (`atl_cpf` ASC) VISIBLE,
  INDEX `fk_inscricao_modalidade` (`mod_id` ASC) VISIBLE,
  CONSTRAINT `fk_inscricao_atleta`
    FOREIGN KEY (`atl_cpf`)
    REFERENCES `competicoes_esportivas`.`atletas` (`atl_cpf`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_inscricao_modalidade`
    FOREIGN KEY (`mod_id`)
    REFERENCES `competicoes_esportivas`.`modalidades` (`mod_id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `competicoes_esportivas`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `competicoes_esportivas`.`usuarios` (
  `usu_id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `senha` VARCHAR(100) NULL DEFAULT NULL,
  `usu_perfil` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`usu_id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
