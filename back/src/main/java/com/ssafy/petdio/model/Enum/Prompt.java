package com.ssafy.petdio.model.Enum;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;


@Getter
public enum Prompt {
    DRAWING(1L,
            "cute stickers, style cartoon, cute pixar black breed Character, high quality, 8K Ultra HD, " +
                    "colorful, pink, orange, blue, yellow, detailed illustration of a cute black breed , " +
                    "beautiful cute pixar black breed , Many bats are flying in the background, " +
                    "highly detailed, by yukisakura, awesome full color, vinyl sticker with white border" ,
            "nude, nsfw, text, letters, too many feet, too many fingers, (((2 heads))), duplicate," +
                    " abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, deformed, poorly drawn, " +
                    "extra limbs, weird colors, 2 heads, long neck, elongated body, cropped image, out of frame, draft, " +
                    "deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, " +
                    "poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face," +
                    " mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, disgusting, " +
                    "extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,"),
    HALLOWEEN(2L,
//            "cute stickers, 8K Ultra HD, highly detailed, Detailed illustration of a cute breed enjoying Halloween, " +
//                    "with lots of pumpkins in the background, magic hat, style cartoon, two-dimensional, planar vector, " +
//                    "character design, vector art, fantasy art, T-shirt design, Background with light brown gradient, Chibi Chara," +
//                    " Super Deformed Character, full body, Cute Design, Two-Dimensional, Character Design, Adorable Characters," +
//                    " Mascot Characters, Adobe Illustrator, soft tetrad color, A digital illustration of anime style , " +
//                    "soft anime tones, luminism, Feeling like Kyoto Animation, pixiv, luminism, 3d render, octane render, " +
//                    "Isometric, by yukisakura, awesome full color,"+
            "A detailed illustration of a print of a colorful cute black breed rides a broom has orange eyes" +
                    " and it wear witch hat and hold a book and peen next to a cute Halloween Pumpkin," +
                    " hyper realistic high quality, t-shit desing graphic, vector, carton, contour, fantasy swirls splash," +
                    " modern t-shirt design, in the style of Studio Ghibli, light white red and green pastel tetradic colors, " +
                    "3D vector art, cute and quirky, fantasy art, watercolor effect, bokeh, Adobe Illustrator," +
                    " hand-drawn, digital painting, low-poly, soft lighting, bird's-eye view, isometric style, " +
                    "retro aesthetic, focusedon the character, 4K resolution, photorealistic rendering, " +
                    "usingCinema 4D, isolated in a white background",
            "Feeling like Kyoto Animation, pixiv, luminism, 3d render, octane render, Isometric, by yukisakura," +
                    " awesome full color,"+ "nude, nsfw, text, letters, too many feet, too many fingers"
                    + "(((2 heads))), duplicate, abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, "
                    + "deformed, poorly drawn, extra limbs, weird colors, 2 heads, long neck, elongated body, cropped image, "
                    + "out of frame, draft, deformed hands, twisted fingers, double image, malformed hands, "
                    + "multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères,"
                    + " bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs,"
                    + " out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, "
                    + "cloned face, missing legs,"),
    NINJA(3L,
            "A detailed illustration face evil ninja breed, magic, t-shirt design, red color, dark magic splash," +
                    " dark, gothic, t-shirt design, in the style of Studio Ghibli, pastel tetradic colors, 3D vector art," +
                    " cute and quirky, fantasy art, watercolor effect, bokeh, Adobe Illustrator, hand-drawn, digital painting," +
                    " low-poly, soft lighting, bird's-eye view, isometric style, retro aesthetic, focused on the character," +
                    " 4K resolution, photorealistic rendering, using Cinema 4D",
            "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid," +
                    " mutilated,((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers)), ((extra headphones)), " +
                    "((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads))), duplicate, man, men, blurry," +
                    " abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, cartoon, 3d, disfigured, " +
                    "bad art, deformed, poorly drawn, extra limbs, close up, b&w, weird colors, blurry, watermark, blur haze," +
                    " 2 heads, long neck, watermark, elongated body, cropped image, out of frame,draft, deformed hands, " +
                    "twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, " +
                    "missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face, mutation, mutated, " +
                    "floating limbs, disconnected limbs, out of focus, long body, disgusting, extra fingers, " +
                    "groos proportions, missing arms, mutated hands, cloned face, missing legs"),
    MINI(4L,
            "cute tiny hyperrealistic Anime brown breed the photo that provided, adorable and fluffy, logo design, cartoon, " +
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
    CHRISTMAS(5L,"illustration Kawaii breed in black punk rock amour, handcuffed to a cross,sticker, " +
            "playing with a small ball of ruby,surrounded by presents, under a mistletoe, Christmas , side view," +
            " Svg sticker, clean white background, professional vector, high detail, t-shirt design, graffiti, vibrant," +
            " Stylized Sticker",
            "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid, \" +\n" +
                    "mutilated,((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers))" +
                    "((extra headphones)), ((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads)))" +
                    "duplicate,  blurry, abstract, disfigured, deformed, disfigured, bad art, deformed," +
                    "poorly drawn,elongated body, cropped image,out of frame,draft,deformed hands, " +
                    "twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly," +
                    "poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, " +
                    "poorly drawn face, mutation, mutated, floating limbs, disconnected limbs");




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
