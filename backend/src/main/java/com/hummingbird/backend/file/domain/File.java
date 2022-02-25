package com.hummingbird.backend.file.domain;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "origName",nullable = false)
    private String origName;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "path",nullable = false)
    private String path;

    @Builder
    public File(Long id, String origName, String name, String path) {
        this.id = id;
        this.origName = origName;
        this.name = name;
        this.path = path;
    }
}