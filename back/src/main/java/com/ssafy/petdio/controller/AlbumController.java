package com.ssafy.petdio.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;

import com.ssafy.petdio.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;


    @GetMapping("album/list")
    public ResponseEntity AlbumList(Model model, @RequestParam("album_user_id") Long album_user_id) {
        return ResponseEntity.status(HttpStatus.OK).body(albumService.albumList(album_user_id));

    }

    @GetMapping("album/list/{album_id}")
    public ResponseEntity AlbumDetail(@PathVariable("album_id") Long album_id){

        return ResponseEntity.status(HttpStatus.OK).body((albumService.albumDetail(album_id)));
    }

    @DeleteMapping("/album/{album_id}")
    public ResponseEntity AlbumDelete(@PathVariable Long album_id){
        albumService.AlbumDelete(album_id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body((albumService.albumDetail(album_id)));
    }

}
