-- CreateTable
CREATE TABLE `api_address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(11) NOT NULL,
    `logradouro` VARCHAR(50) NULL,
    `complemento` VARCHAR(50) NULL,
    `bairro` VARCHAR(50) NULL,
    `localidade` VARCHAR(50) NOT NULL,
    `uf` VARCHAR(2) NOT NULL,
    `ibge` VARCHAR(20) NULL,
    `gia` VARCHAR(20) NULL,
    `ddd` VARCHAR(3) NULL,
    `siafi` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
