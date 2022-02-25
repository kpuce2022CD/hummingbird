package com.hummingbird.backend.file.dto;
import com.hummingbird.backend.file.domain.File;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FileDto {
    private Long id;
    private String origName;
    private String name;
    private String path;

    public File toEntity() {
        File build = File.builder()
                .id(id)
                .origName(origName)
                .name(name)
                .path(path)
                .build();
        return build;
    }

    @Builder
    public FileDto(Long id, String origName, String name, String path) {
        this.id = id;
        this.origName = origName;
        this.name = name;
        this.path = path;
    }
}