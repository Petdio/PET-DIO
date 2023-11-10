package com.ssafy.petdio.model.Enum;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;


@Getter
public enum Prompt {
    STICKER(1L,
//            "cute stickers, style cartoon, cute pixar black breed Character, high quality, 8K Ultra HD, " +
//                    "colorful, pink, orange, blue, yellow, detailed illustration of a cute black breed , " +
//                    "beautiful cute pixar black breed , Many bats are flying in the background, " +
//                    "highly detailed, by yukisakura, awesome full color, vinyl sticker with white border" ,
//            "nude, nsfw, text, letters, too many feet, too many fingers, (((2 heads))), duplicate," +
//                    " abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, deformed, poorly drawn, " +
//                    "extra limbs, weird colors, 2 heads, long neck, elongated body, cropped image, out of frame, draft, " +
//                    "deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, " +
//                    "poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face," +
//                    " mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, disgusting, " +
//                    "extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,"),

//            "clipart a happy Schnauzer dog with white background for sticker", "dog collar, flowers, background"),
//            DreamShaper v7

            "cute breed stickers, style cartoon, cute pixar breed Character, high quality, 8K Ultra HD, " +
                    "(Detailed colors like the imagePrompts provided, )" +
                    "beautiful cute pixar breed ,breed STICKER, in the style of Studio Ghibli,3D vector art breed ,cute and quirky breed," +
                    " Adobe Illustrator,digital painting,isometric style, retro aesthetic, focusedon the character, 4K resolution," +
                    " photorealistic rendering, usingCinema 4D,cute stickers,style cartoon,highly detailed, planar vector," +
                    "character design breed ,Super Deformed Character,Cute Design,Character Design," +
                    "A digital illustration of anime style, soft anime tones, by yukisakura, awesome full color," +
                    "Printable sticker about minimal cute cartoon imagePrompts, white background," +
                    "highly detailed, by yukisakura, awesome full color, vinyl sticker with white border," ,
            "nude, nsfw, text, letters, too many feet, too many fingers, (((2 heads))), duplicate," +
                    " abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, deformed, poorly drawn, " +
                    "extra limbs, weird colors, 2 heads, long neck, elongated body, cropped image, out of frame, draft, " +
                    "deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, " +
                    "poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face," +
                    " mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, disgusting, " +
                    "extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,"),
    HALLOWEEN(2L,
            "A detailed illustration of a print of a cute breed rides a broom and it wear witch hat and " +
                    "hold a book and peen next to a cute Halloween Pumpkin, hyper realistic high quality, " +
                    "t-shit desing graphic, vector, carton, contour, fantasy swirls splash, modern t-shirt design, " +
                    "in the style of Studio Ghibli, light white red and green pastel tetradic colors, 3D vector art, " +
                    "cute and quirky, fantasy art, watercolor effect, bokeh, Adobe Illustrator, hand-drawn, digital painting," +
                    " low-poly, soft lighting, bird's-eye view, isometric style, retro aesthetic, focusedon the character, " +
                    "4K resolution, photorealistic rendering, usingCinema 4D, isolated in a white background",
            "T-shirt mock-up"),

    NINJA(3L,
            "A detailed illustration face evil ninja breed,magic, t-shirt design, red color , dark magic splash, " +
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
    CHRISTMAS(5L,"A breed wearing a red Christmas hat," +
            " sitting next to a Christmas tree made of breed. " +
            "Happy Pawlidays written in groovy font. White background. T-shirt design.",
            "");




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
