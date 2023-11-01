package com.ssafy.petdio.controller;


import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;

import com.ssafy.petdio.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AlbumController {

    private final AlbumService albumService;


    @GetMapping("album/list")
    public ResponseEntity AlbumList(HttpServletRequest request, Authentication authentication) {
        log.info("getAlbumList");
        Long userId = Long.valueOf(String.valueOf(authentication.getName()));
        return ResponseEntity.status(HttpStatus.OK).body(albumService.albumList(userId));
    }

    @GetMapping("album/list/{album_id}")
    public ResponseEntity AlbumDetail(@PathVariable("album_id") Long album_id) {

        return ResponseEntity.status(HttpStatus.OK).body((albumService.albumDetail(album_id)));
    }

    @DeleteMapping("/album/{album_id}")
    public ResponseEntity AlbumDelete(@PathVariable Long album_id) {
        albumService.AlbumDelete(album_id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body((albumService.albumDetail(album_id)));
    }

}
