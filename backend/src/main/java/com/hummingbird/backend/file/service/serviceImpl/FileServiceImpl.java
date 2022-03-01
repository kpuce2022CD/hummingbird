//package com.hummingbird.backend.file.service.serviceImpl;
//
//import com.hummingbird.backend.file.domain.File;
//import com.hummingbird.backend.file.dto.FileDto;
//import com.hummingbird.backend.file.repository.FileRepository;
//import com.hummingbird.backend.file.service.FileService;
//import com.hummingbird.backend.util.MD5Generator;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.transaction.Transactional;
//
//@Service
//public class FileServiceImpl implements FileService {
//    private FileRepository fileRepository;
//
//    public FileServiceImpl(FileRepository fileRepository) {
//        this.fileRepository = fileRepository;
//    }
//
//    public FileDto uploadFile(MultipartFile files){
//        FileDto fileDto = new FileDto();
//        try {
//            String origName = files.getOriginalFilename();
//            String name = new MD5Generator(origName).toString();
//            String savePath = System.getProperty("user.dir") + "/files";
//            /* 파일이 저장되는 폴더가 없으면 폴더를 생성합니다. */
//            if (!new java.io.File(savePath).exists()) {
//                try {
//                    new java.io.File(savePath).mkdir();
//                } catch (Exception e) {
//                    e.getStackTrace();
//                }
//            }
//            String path = savePath + "/" + name;
//            files.transferTo(new java.io.File(path));
//
//
//            fileDto.setOrigName(origName);
//            fileDto.setName(name);
//            fileDto.setPath(path);
//        }  catch (Exception e) {
//            e.printStackTrace();
//        }
//        return fileDto;
//
//    }
//
//    @Transactional
//    public Long saveFile(FileDto fileDto) {
//
//        return fileRepository.save(fileDto.toEntity()).getId();
//    }
//
//    @Transactional
//    public FileDto getFile(Long id) {
//        File file = fileRepository.findById(id).get();
//
//        FileDto fileDto = FileDto.builder()
//                .id(id)
//                .origName(file.getOrigName())
//                .name(file.getName())
//                .path(file.getPath())
//                .build();
//        return fileDto;
//    }
//}