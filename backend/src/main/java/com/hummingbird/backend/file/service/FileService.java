package com.hummingbird.backend.file.service;

import com.hummingbird.backend.file.domain.File;
import com.hummingbird.backend.file.dto.FileDto;
import com.hummingbird.backend.file.repository.FileRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class FileService {
    private FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Transactional
    public Long saveFile(FileDto fileDto) {
        return fileRepository.save(fileDto.toEntity()).getId();
    }

    @Transactional
    public FileDto getFile(Long id) {
        File file = fileRepository.findById(id).get();

        FileDto fileDto = FileDto.builder()
                .id(id)
                .origName(file.getOrigName())
                .name(file.getName())
                .path(file.getPath())
                .build();
        return fileDto;
    }
}