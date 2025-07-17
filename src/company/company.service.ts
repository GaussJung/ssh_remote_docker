import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

/**
 * Company Service
 * - 회사 관련 비즈니스 로직 처리
 */
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  /**
   * 전체 회사 목록 조회
   * @returns 모든 회사 리스트
   */
  findAll(): Promise<Company[]> {
    return this.companyRepo.find();
  }

  /**
   * 특정 회사 조회
   * @param cid 회사 ID
   * @returns 회사 엔티티 또는 null
   */
  findOne(cid: number): Promise<Company | null> {
    return this.companyRepo.findOneBy({ cid });
  }

  /**
   * 신규 회사 등록
   * @param dto 회사 정보 DTO
   * @returns 생성된 회사 엔티티
   */
  create(dto: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepo.create(dto);
    return this.companyRepo.save(company);
  }

  /**
   * 회사 정보 수정
   * @param cid 회사 ID
   * @param dto 수정할 필드 DTO
   * @returns 수정된 회사 엔티티 또는 null
   */
  async update(cid: number, dto: UpdateCompanyDto): Promise<Company | null> {
    await this.companyRepo.update({ cid }, dto);
    return this.findOne(cid);
  }

  /**
   * 회사 삭제
   * @param cid 회사 ID
   * @returns void
   */
  async delete(cid: number): Promise<void> {
    await this.companyRepo.delete({ cid });
  }

  /**
   * 회사명으로 검색 (LIKE)
   * @param cname 검색어
   * @returns 매칭된 회사 리스트
   */
  searchByCname(cname: string): Promise<Company[]> {
    return this.companyRepo.find({
      where: { cname: Like(`%${cname}%`) },
    });
  }

  /**
   * 전화번호로 검색 (exact match)
   * @param cphone 전화번호
   * @returns 매칭된 회사 리스트
   */
  searchByCphone(cphone: string): Promise<Company[]> {
    return this.companyRepo.find({
      where: { cphone },
    });
  }
}
