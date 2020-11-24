<?php

namespace App\Http\Controllers\Api;

use App\Service\CountryService;
use App\Service\CustomJsonResponse;
use App\Service\FileService;
use App\Survey;
use App\SurveyChoice;
use App\SurveyVote;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SurveyChoiceController extends Controller
{
    public function destroy(SurveyChoice $choice, CustomJsonResponse $jsonResponse)
    {
        $choice->votes()->delete();

        $choice->delete();

        $survey  = $choice->survey;

        $jsonResponse->setData(
            200,
            'msg.info.list.survey_choices',
            $survey->choices,
            null,
            null
        );

        return $jsonResponse->getResponse();

    }

    public function uploadImage(Request $request, CustomJsonResponse $jsonResponse)
    {
        $fileService = new FileService();

        $file = $request->files->get('choice_image');

        $fileResult = $fileService->upload($file, 'choice');

        $choice = SurveyChoice::find($request->get('choice_id'));

        //delete previous image pass type and name
        if($choice->choice_image){
            $fileService->deleteImage('choice', $choice->choice_image);
        }
        $choice->update([
            'choice_image' => $fileResult[0]['name']
        ]);

        $jsonResponse->setData(
            200,
            'msg.info.choice.image',
            $fileResult,
            null,
            null
        );

        return $jsonResponse->getResponse();
    }

    public function addChoice(Survey $survey, CustomJsonResponse $jsonResponse, Request $request)
    {
        $choiceSaved = SurveyChoice::create([
            'choice_title' => \request('choice_title'),
            'survey_id' => $survey->id,
            'choice_image' => \request('image'),
            'choice_description' => \request('choice_description'),
            'user_id' => auth()->user()->id
        ]);


        if(!$survey->is_world && auth()->user()->country_id != $survey->country_id ){
            return $jsonResponse->setData(500, 'msg.error_choice_add');
        }


        $country = (new CountryService($request))->getCountry();

        $country = (!is_null(auth()->user()->country_id) ? auth()->user()->country_id  : ($country ? $country->id : null));

        $vote = new SurveyVote();
        $vote->survey_id = $survey->id;
        $vote->choice_id = $choiceSaved->id;
        $vote->user_id   = auth()->user()->id;
        $vote->country_id = $country;
        $vote->mark = \request('marking');
        $vote->save();

        // $survey = Survey::where('id','=',$survey->id)->first();

        $jsonResponse->setData(200,'msg.info.list.survey_choices',$survey);
        return $jsonResponse->getResponse();
    }

    public function pendingChoices(CustomJsonResponse $jsonResponse)
    {
        /* $survey = Survey::with(['choices.user'])
             ->where('country_id','=', Auth::user()->country_id)
             ->whereHas('choices', function ($item){
                 $item->where('status','=',false);
             })
             ->get();*/

        $survey = SurveyChoice::with('onlySurvey', 'user')
            ->where('status',false);

            if(auth()->user()){

                if(auth()->user()->hasAnyRole(['country_admin'])){

                    $survey->whereHas('onlySurvey', function($q){
                        $q->where('is_world', false)->where('country_id', auth()->user()->country_id);
                    });
                    
                } else {
                    $survey->whereHas('onlySurvey', function($q){
                        $q->where('is_world', true);
                    });
                }
                
            }

            $survey = $survey->get();


        $jsonResponse->setData(200,'msg.info.list.survey_choices', $survey);
        return $jsonResponse->getResponse();
    }

    public function statusUpdate($id, CustomJsonResponse $jsonResponse)
    {
        $survey = SurveyChoice::where('id','=',$id)->first();
        $survey->status =\request('status');
        $survey->save();
        $jsonResponse->setData(200,'msg.info.list.survey_choices', $survey);
        return $jsonResponse->getResponse();
    }
}
