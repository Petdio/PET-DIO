package com.ssafy.petdio.controller;

import org.springframework.ui.Model;
import com.ssafy.petdio.model.entity.Album;
import com.ssafy.petdio.service.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;



    @GetMapping("album/list")
    public String AlbumList(Model model, @RequestParam("album_user_id") Long album_user_id){
        List<Album> albumlist = albumService.albumList(album_user_id);
        model.addAttribute("albumlist", albumlist);
        return"album/list";


}
