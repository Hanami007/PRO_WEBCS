import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileDto } from 'src/files/dto/file.dto';
import { AboutSectionDto } from 'src/about-sections/dto/about-section.dto';

export class CreateAboutContentDto {
  @ApiProperty({
    type: () => AboutSectionDto,
    description: 'ข้อมูล Section หรือระบุเป็น ID ของ Section',
    example: { id: 'uuid-of-section-1234' },
  })
  @IsNotEmpty()
  section: AboutSectionDto;

  @ApiProperty({
    description: 'รูปแบบการจัดวาง (เช่น left, right, center)',
    example: 'left',
  })
  @IsString()
  @IsNotEmpty()
  layoutType: string;

  @ApiPropertyOptional({
    description: 'หัวข้อเนื้อหา',
    example: 'ประวัติความเป็นมาของสาขา',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional({
    description: 'รายละเอียดเนื้อหา (รองรับ HTML หรือ Text)',
    example: '<p>ก่อตั้งเมื่อปี พ.ศ. 2530 โดยมีวัตถุประสงค์เพื่อ...</p>',
  })
  @IsString()
  @IsOptional()
  body: string;

  @ApiPropertyOptional({
    type: () => FileDto,
    description: 'รูปภาพประกอบ (Object File)',
  })
  @IsOptional()
  image?: FileDto | null;

  @ApiPropertyOptional({
    description: 'ลำดับการแสดงผล',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  sortOrder: number;
}
