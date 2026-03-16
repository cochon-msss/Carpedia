-- 제조사 logo_url 업데이트 (SVG 파일 경로)

UPDATE manufacturer SET logo_url = '/svg/logos/hyundai.svg' WHERE manufacturer_seq = 1;
UPDATE manufacturer SET logo_url = '/svg/logos/kia.svg' WHERE manufacturer_seq = 2;
UPDATE manufacturer SET logo_url = '/svg/logos/genesis.svg' WHERE manufacturer_seq = 4;
UPDATE manufacturer SET logo_url = '/svg/logos/renault.svg' WHERE manufacturer_seq = 5;
UPDATE manufacturer SET logo_url = '/svg/logos/kg.svg' WHERE manufacturer_seq = 6;
UPDATE manufacturer SET logo_url = '/svg/logos/gm.svg' WHERE manufacturer_seq = 8;
UPDATE manufacturer SET logo_url = '/svg/logos/daewoo.svg' WHERE manufacturer_seq = 131;

-- 추후 수입 제조사 추가 시 사용
-- UPDATE manufacturer SET logo_url = '/svg/logos/bmw.svg' WHERE manufacturer_name = 'BMW';
-- UPDATE manufacturer SET logo_url = '/svg/logos/mercedes.svg' WHERE manufacturer_name = '메르세데스-벤츠';
-- UPDATE manufacturer SET logo_url = '/svg/logos/audi.svg' WHERE manufacturer_name = '아우디';
-- UPDATE manufacturer SET logo_url = '/svg/logos/volkswagen.svg' WHERE manufacturer_name = '폭스바겐';
-- UPDATE manufacturer SET logo_url = '/svg/logos/toyota.svg' WHERE manufacturer_name = '도요타';
-- UPDATE manufacturer SET logo_url = '/svg/logos/honda.svg' WHERE manufacturer_name = '혼다';
-- UPDATE manufacturer SET logo_url = '/svg/logos/volvo.svg' WHERE manufacturer_name = '볼보';
