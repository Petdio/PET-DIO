package com.ssafy.petdio.model.Enum;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;


@Getter
public enum Prompt {
    STICKER(1L,

            "(normal picture), prompt page for adults, breed in the picture, image ( breed, white background,) " +
                    "clean line art, fine dark line art--HDS--Ar 2:3" +
                    "(only breed, white background), (Black and white outline art for cute book pages)," +
                    " all white, children's style, white background, whole body, sketch style, " +
                    "((white background)), ((only outlines used)), cartoon style, lines, coloring book, clean lines, " +
                    "background. White, Sketch style",

            "(long bady),nude, nsfw, text, letters, too many feet, (too many fingers), (((2 heads))), duplicate," +
                    " abstract, ((disfigured)), deformed, toy, figure, framed, disfigured, ((bad art)), deformed, poorly drawn, " +
                    "extra limbs, weird colors, (2 heads), (long neck), ((elongated body)), cropped image, out of frame, draft, " +
                    "deformed hands, (twisted fingers), ((double image)), malformed hands, multiple heads, extra limb, ugly, " +
                    "poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face," +
                    " mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, disgusting, " +
                    "extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,"),
    HALLOWEEN(2L,
            "(normal picture),cute breed stickers, 8K Ultra HD, highly detailed, Detailed illustration of a cute breed enjoying Halloween, " +
                    "with lots of pumpkins in the background, magic hat, style cartoon, two-dimensional, planar vector, " +
                    "character design, vector art, fantasy art, T-shirt design, Background with light brown gradient, Chibi Chara," +
                    " Super Deformed Character, full body, Cute Design, Two-Dimensional, Character Design, Adorable Characters," +
                    " Mascot Characters, Adobe Illustrator, soft tetrad color, A digital illustration of anime style, " +
                    "soft anime tones, luminism, Feeling like Kyoto Animation, pixiv, luminism, 3d render, octane render, " +
                    "Isometric, by yukisakura, awesome full color,",
            "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid," +
                    "mutilated,((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers)), ((extra headphones)), " +
                    "((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads))), duplicate, man, men, blurry," +
                    "abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, cartoon, 3d, disfigured," +
                    "bad art, deformed, poorly drawn, extra limbs, close up, b&w, weird colors, blurry, watermark, " +
                    "blur haze, 2 heads, long neck, watermark, elongated body, cropped image,out of frame,draft," +
                    " deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, " +
                    " ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, " +
                    " poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body," +
                    " disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs"),

    NINJA(3L,
            "(normal picture),A detailed illustration face evil ninja breed,magic, t-shirt design, red color , dark magic splash, " +
                    "dark, ghotic, t-shirt design, in the style of Studio Ghibli, pastel tetradic colors, " +
                    "3D vector art, cute and quirky, fantasy art, watercolor effect, bokeh, Adobe Illustrator, " +
                    "hand-drawn, digital painting, low-poly, soft lighting, bird's-eye view, isometric style," +
                    " retro aesthetic, focused on the character, 4K resolution, photorealistic rendering, using Cinema 4D",

            "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid," +
                    " mutilated,((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers)), ((extra headphones)), " +
                    "((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads))), duplicate, man, men, blurry, " +
                    "abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, cartoon, 3d, disfigured," +
                    " bad art, deformed, poorly drawn, extra limbs, close up, b&w, weird colors, blurry, watermark, " +
                    "blur haze, 2 heads, long neck, watermark, elongated body, cropped image,out of frame,draft," +
                    "deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, " +
                    "ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, " +
                    "poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body," +
                    " disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs"),
    MINI(4L,
            "(normal picture),cute tiny hyperrealistic Anime breed the photo that provided, adorable and fluffy, logo design, cartoon, " +
                    "cinematic lighting effect, charming, 3D vector art, cute and quirky, fantasy art, bokeh, hand-drawn, " +
                    "digital painting, soft lighting, isometric style , 4K resolution, photorealistic rendering," +
                    " highly detailed clean, vector image, photorealistic masterpiece, professional photography, " +
                    "simple space backdrop, flat white background, isometric, vibrant vector",
            "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid, " +
                    "mutilated,((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers)), " +
                    "((extra headphones)), ((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads))), " +
                    "duplicate,  blurry, abstract, disfigured, deformed, disfigured, bad art, deformed, " +
                    "poorly drawn,elongated body, cropped image,out of frame,draft,deformed hands, " +
                    "twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, " +
                    "poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, " +
                    "poorly drawn face, mutation, mutated, floating limbs, disconnected limbs"),
    SKY(5L,"(normal picture),An artistic portrait of a breed suspended in a blue sky with fluffy clouds," +
            " the breed assumes a majestic pose as if exploring the heavens. Sunlight illuminates the scene, " +
            "creating a radiant image full of life. The expression on the breed face is one of joy " +
            "and bravery as he gazes toward the horizon in this captivating illustration.",

            "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid, mutilated," +
                    "((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers)), ((extra headphones))," +
                    " ((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads))), duplicate, man, men, blurry, " +
                    "abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, cartoon, 3d, disfigured, " +
                    "bad art, deformed, poorly drawn, extra limbs, close up, b&w, weird colors, blurry, watermark, blur haze, " +
                    "2 heads, long neck, watermark, elongated body, cropped image,out of frame,draft,deformed hands, " +
                    "twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, " +
                    "missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face, mutation, mutated," +
                    " floating limbs, disconnected limbs, out of focus, long body, disgusting, extra fingers, groos proportions," +
                    " missing arms, mutated hands, cloned face, missing legs");




    private Long id;
    private String prompt;
    private String negativePrompt;

    private static final Map<Long, Prompt> enumIdMap = new HashMap<>();

    static {
        for (Prompt item : Prompt.values()) {
            enumIdMap.put(item.getId(), item);
        }
    }
    Prompt(Long id, String prompt, String negativePrompt) {
        this.id = id;
        this.prompt = prompt;
        this.negativePrompt = negativePrompt;
    }

    public static Prompt findEnumById(Long id) {
        return enumIdMap.get(id);
    }
}
